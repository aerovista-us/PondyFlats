import { spawn } from 'node:child_process';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { createServer, request } from 'node:http';
import { Buffer } from 'node:buffer';
import { extname, join, normalize, relative } from 'node:path';

const chromeBin = process.env.CHROME_BIN || '/usr/bin/chromium-browser';
const outDir = process.argv[2] || '/tmp/pondy-d3-qa';
let base = process.argv[3] || '';
const port = Number(process.env.CDP_PORT || 9333);
const profile = `/tmp/pondy-d3-chrome-${process.pid}`;
const pages = ['design-3.html', 'd3-site.html', 'd3-plan-closure.html', 'd3-elevs.html', 'd3-axon.html', 'd3-sections.html'];
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 1100, scale: 1 },
  { name: 'tablet-1024', width: 1024, height: 900, scale: 1 },
  { name: 'tablet-768', width: 768, height: 900, scale: 1 },
  { name: 'mobile-390', width: 390, height: 900, scale: 1 },
];
const requiredSvgs = {
  'design-3.html': 0,
  'd3-site.html': 1,
  'd3-plan-closure.html': 2,
  'd3-elevs.html': 4,
  'd3-axon.html': 1,
  'd3-sections.html': 1,
};
const requiredFigures = {
  'd3-site.html': ['drawing'],
  'd3-plan-closure.html': ['ground', 'upper'],
  'd3-elevs.html': ['penn', 'rear', 'north', 'south'],
  'd3-axon.html': ['drawing'],
  'd3-sections.html': ['drawing'],
};
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};
async function startStaticServer(root) {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', 'http://127.0.0.1');
      const rel = decodeURIComponent(url.pathname.replace(/^\/+/, '')) || 'index.html';
      const file = normalize(join(root, rel));
      if (relative(root, file).startsWith('..')) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      const info = await stat(file);
      const actual = info.isDirectory() ? join(file, 'index.html') : file;
      const body = await readFile(actual);
      res.writeHead(200, { 'content-type': mime[extname(actual)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  return { server, base: `http://127.0.0.1:${address.port}/` };
}
function isExpectedRequestFailure(item) {
  const url = item.url || '';
  return (item.status === 404 && /\/favicon\.ico$/.test(url)) || item.error === 'net::ERR_ABORTED';
}
function resultFailures(result) {
  const out = [];
  const m = result.metrics || {};
  if ((m.failText || []).length) out.push('renderer fallback output: ' + (m.failText || []).join(' | '));
  if ((m.bodyTextLength || 0) <= 0) out.push('blank body text');
  if (m.horizontalOverflow) out.push('horizontal overflow ' + m.scrollWidth + '>' + m.clientWidth);
  const expectedSvgCount = requiredSvgs[result.page];
  if (expectedSvgCount != null && (m.svgCount || 0) < expectedSvgCount) out.push('required SVG count ' + (m.svgCount || 0) + '<' + expectedSvgCount);
  for (const id of requiredFigures[result.page] || []) {
    const fig = m.figs && m.figs[id];
    if (!fig) out.push('missing required figure #' + id);
    else if (!fig.hasSvg) out.push('required figure #' + id + ' has no SVG');
    else if (fig.width <= 40 || fig.height <= 40) out.push('required figure #' + id + ' too small ' + fig.width + 'x' + fig.height);
  }
  for (const item of result.consoleItems || []) out.push(item.type + ': ' + item.text);
  for (const item of (result.failedRequests || []).filter((x) => !isExpectedRequestFailure(x))) out.push('request ' + (item.status || item.error) + ': ' + (item.url || item.requestId || ''));
  if (result.page === 'd3-plan-closure.html') {
    const gate = m.planGate;
    if (!gate) out.push('missing plan geometry gate');
    else {
      if (gate.verdict !== 'PASS') out.push('plan closure verdict ' + gate.verdict);
      if (!gate.geometryOk) out.push('plan geometry failures: ' + (gate.geometryFailures || []).join(' | '));
      for (const unit of ['A', 'B']) {
        if ((gate.planningArea?.[unit] || 0) < (gate.areaTarget || 1800)) {
          out.push(`Unit ${unit} area ${gate.planningArea?.[unit] || 0}<${gate.areaTarget || 1800}`);
        }
      }
    }
  }
  return out;
}

function httpJson(path, method = 'GET', parseJson = true) {
  return new Promise((resolve, reject) => {
    const req = request({ host: '127.0.0.1', port, path, method }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (c) => { body += c; });
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`${method} ${path} -> ${res.statusCode}: ${body}`));
          return;
        }
        if (!parseJson) {
          resolve(body);
          return;
        }
        try { resolve(JSON.parse(body)); } catch (err) { reject(err); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function waitForChrome() {
  const start = Date.now();
  while (Date.now() - start < 15000) {
    try {
      return await httpJson('/json/version');
    } catch {
      await new Promise((r) => setTimeout(r, 250));
    }
  }
  throw new Error('Timed out waiting for Chromium CDP');
}

function cdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const listeners = [];
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result || {});
      return;
    }
    for (const fn of listeners) fn(msg);
  };
  const opened = new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  return {
    opened,
    on(fn) { listeners.push(fn); },
    send(method, params = {}) {
      const callId = ++id;
      ws.send(JSON.stringify({ id: callId, method, params }));
      return new Promise((resolve, reject) => pending.set(callId, { resolve, reject }));
    },
    close() { ws.close(); },
  };
}

async function evaluate(client, expression) {
  const result = await client.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  return result.result?.value;
}

async function qaPage(page, viewport) {
  const target = await httpJson(`/json/new?${encodeURIComponent(new URL(page, base).href)}`, 'PUT');
  const client = cdp(target.webSocketDebuggerUrl);
  const consoleItems = [];
  const failedRequests = [];
  await client.opened;
  client.on((msg) => {
    if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(msg.params.type)) {
      consoleItems.push({ type: msg.params.type, text: msg.params.args.map((a) => a.value ?? a.description ?? '').join(' ') });
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      consoleItems.push({ type: 'exception', text: msg.params.exceptionDetails?.text || 'Runtime exception' });
    }
    if (msg.method === 'Network.responseReceived' && msg.params.response.status >= 400) {
      failedRequests.push({ status: msg.params.response.status, url: msg.params.response.url });
    }
    if (msg.method === 'Network.loadingFailed') {
      failedRequests.push({ status: 'failed', requestId: msg.params.requestId, error: msg.params.errorText });
    }
  });
  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('Network.enable');
  await client.send('Log.enable');
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.scale,
    mobile: viewport.width < 600,
  });
  const loaded = new Promise((resolve) => client.on((msg) => { if (msg.method === 'Page.loadEventFired') resolve(); }));
  await client.send('Page.navigate', { url: new URL(page, base).href });
  await Promise.race([loaded, new Promise((r) => setTimeout(r, 12000))]);
  await new Promise((r) => setTimeout(r, 900));
  const metrics = await evaluate(client, `(() => {
    const doc = document.documentElement;
    const svgs = [...document.querySelectorAll('svg')].map((svg) => {
      const r = svg.getBoundingClientRect();
      return { aria: svg.getAttribute('aria-label') || '', width: Math.round(r.width), height: Math.round(r.height), visible: r.width > 40 && r.height > 40 };
    });
    const figs = {};
    ['penn','rear','north','south','site','axon','ground','upper','drawing'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      figs[id] = { hasSvg: !!el.querySelector('svg'), text: el.innerText.trim().slice(0,160), width: Math.round(r.width), height: Math.round(r.height) };
    });
    const navPlans = [...document.querySelectorAll('nav a')].filter((a) => /plans/i.test(a.textContent)).map((a) => a.getAttribute('href'));
    const planGate = window.Lot2Design3PlanClosure ? (() => {
      const g = window.Lot2Design3PlanClosure.analyze();
      return {
        verdict: g.verdict,
        planningArea: g.planningArea,
        areaTarget: g.areaTarget,
        geometryOk: !!g.geometry?.ok,
        geometryFailures: g.geometry?.failures || [],
      };
    })() : null;
    return {
      title: document.title,
      bodyTextLength: document.body.innerText.trim().length,
      failText: [...document.querySelectorAll('.fail:not(.mark)')].map((x) => x.innerText.trim()),
      svgCount: svgs.length,
      svgs,
      figs,
      navPlans,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      horizontalOverflow: doc.scrollWidth > doc.clientWidth + 2,
      planGate,
    };
  })()`);
  const screenshot = `${outDir}/${viewport.name}-${page.replace('.html', '')}.png`;
  const shot = await client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, fromSurface: true });
  await writeFile(screenshot, Buffer.from(shot.data, 'base64'));
  const clips = [];
  if (page === 'd3-elevs.html' && viewport.name === 'desktop-1440') {
    for (const id of ['penn', 'rear', 'north', 'south']) {
      await evaluate(client, `document.querySelector('#${id}').scrollIntoView({block:'center'})`);
      await new Promise((r) => setTimeout(r, 250));
      const clip = await evaluate(client, `(() => { const r = document.querySelector('#${id}').getBoundingClientRect(); return {x:Math.max(0,r.left + window.scrollX),y:Math.max(0,r.top + window.scrollY),width:r.width,height:r.height,scale:1}; })()`);
      const data = await client.send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: true, fromSurface: true });
      const file = `${outDir}/desktop-1440-elevation-${id}.png`;
      await writeFile(file, Buffer.from(data.data, 'base64'));
      clips.push(file);
    }
  }
  if (page === 'd3-axon.html' && viewport.name === 'desktop-1440') {
    const clip = await evaluate(client, `(() => { const r = document.querySelector('#drawing').getBoundingClientRect(); return {x:Math.max(0,r.left + window.scrollX),y:Math.max(0,r.top + window.scrollY),width:r.width,height:r.height,scale:1}; })()`);
    const data = await client.send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: true, fromSurface: true });
    const file = `${outDir}/desktop-1440-axon-drawing.png`;
    await writeFile(file, Buffer.from(data.data, 'base64'));
    clips.push(file);
  }
  client.close();
  await httpJson(`/json/close/${target.id}`, 'GET', false).catch(() => null);
  return { page, viewport: viewport.name, screenshot, clips, consoleItems, failedRequests, metrics };
}

await mkdir(outDir, { recursive: true });
await rm(profile, { recursive: true, force: true });
const localServer = base ? null : await startStaticServer(process.cwd());
if (!base) base = localServer.base;
const chrome = spawn(chromeBin, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  'about:blank',
], { stdio: ['ignore', 'pipe', 'pipe'] });

try {
  await waitForChrome();
  const results = [];
  for (const viewport of viewports) {
    for (const page of pages) {
      results.push(await qaPage(page, viewport));
    }
  }
  const failures = results.flatMap((result) => resultFailures(result).map((failure) => ({ page: result.page, viewport: result.viewport, failure })));
  const resultFile = `${outDir}/qa-results.json`;
  await writeFile(resultFile, JSON.stringify({ base, generatedAt: new Date().toISOString(), results, failures }, null, 2));
  console.log(JSON.stringify({ outDir, base, resultFile, pages, viewports: viewports.map((v) => v.name), failures }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  chrome.kill('SIGTERM');
  if (localServer) await new Promise((resolve) => localServer.server.close(resolve));
  await rm(profile, { recursive: true, force: true });
}
