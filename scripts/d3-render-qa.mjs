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
const packageMode = process.env.D3_QA_PACKAGE === '1';
const packageAliases = { 'index.html':'design-3.html', 'site.html':'d3-site.html', 'plans.html':'d3-plan-closure.html', 'elevs.html':'d3-elevs.html', 'axon.html':'d3-axon.html', 'sections.html':'d3-sections.html' };
const pages = packageMode ? Object.keys(packageAliases) : ['design-3.html', 'd3-site.html', 'd3-plan-closure.html', 'd3-elevs.html', 'd3-axon.html', 'd3-sections.html'];
const canonicalPage = (page) => packageMode ? packageAliases[page] : page;
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 1100, scale: 1 },
  { name: 'tablet-1024', width: 1024, height: 900, scale: 1 },
  { name: 'tablet-768', width: 768, height: 900, scale: 1 },
  { name: 'mobile-390', width: 390, height: 900, scale: 1 },
];
const requiredSvgs = {
  'design-3.html': 1,
  'd3-site.html': 2,
  'd3-plan-closure.html': 3,
  'd3-elevs.html': 4,
  'd3-axon.html': 2,
  'd3-sections.html': 1,
};
const requiredFigures = {
  'd3-site.html': ['drawing', 'swept-path'],
  'd3-plan-closure.html': ['ground', 'upper', 'bubble-drawing'],
  'd3-elevs.html': ['penn', 'rear', 'north', 'south'],
  'd3-axon.html': ['massing-drawing', 'axon-drawing'],
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
  const key = canonicalPage(result.page);
  const expectedSvgCount = requiredSvgs[key];
  if (expectedSvgCount != null && (m.svgCount || 0) < expectedSvgCount) out.push('required SVG count ' + (m.svgCount || 0) + '<' + expectedSvgCount);
  for (const id of requiredFigures[key] || []) {
    const fig = m.figs && m.figs[id];
    if (!fig) out.push('missing required figure #' + id);
    else if (!fig.hasSvg) out.push('required figure #' + id + ' has no SVG');
    else if (fig.width <= 40 || fig.height <= 40) out.push('required figure #' + id + ' too small ' + fig.width + 'x' + fig.height);
  }
  if (key === 'd3-site.html') {
    const sm=m.sweepMeta || {};
    if ((m.vehicleBodies || []).length < 20) out.push('A-002 missing continuous locked FS-SUV body sweep');
    for (const body of m.vehicleBodies || []) {
      if (Math.abs(body.lengthFt - 20.5) > 1e-6 || Math.abs(body.widthFt - 8) > 1e-6) out.push(`A-002 vehicle body ${body.lengthFt}x${body.widthFt} != locked 20.5x8.0`);
      if (Math.abs(body.turnRadiusFt - 25) > 1e-6) out.push(`A-002 turn radius ${body.turnRadiusFt} != locked 25`);
    }
    if ((sm.poseCount||0)<20) out.push('A-002 sweep pose count too small: '+(sm.poseCount||0));
    if ((sm.arcPoseCount||0)<6) out.push('A-002 has no meaningful filleted arc sweep');
    if ((sm.shortTangentCount||0)!==0) out.push('A-002 has short-tangent turning-radius failures: '+sm.shortTangentCount);
    if (Math.abs((sm.turnRadiusFt||0)-25)>1e-6) out.push('A-002 sweep metadata turn radius is not 25 ft');
    if ((sm.minClearanceFt||0)<1) out.push('A-002 continuous clearance '+(sm.minClearanceFt||0)+' ft < 1 ft');
    if (sm.proofScope!=='threshold-approach') out.push('A-002 must be scoped as threshold approach, not full garage-entry proof');
    if (sm.fullEnclosure!==false) out.push('A-002 must explicitly state full enclosure is not proven');
    if (Math.abs((sm.garageDepthFt||0)-20)>1e-6 || Math.abs((sm.depthDeficitFt||0)-.5)>1e-6) out.push('A-002 garage fit disclosure does not match 20.5 ft vehicle / 20 ft garage');
    if (sm.outboundProof!=='threshold-return-reverse-equivalent') out.push('A-002 threshold-return proof missing');
  }
  if (key === 'd3-elevs.html') {
    for (const id of ['rear','north','south']) if ((m.figs?.[id]?.garageDoors||0)!==0) out.push(`${id} elevation shows a garage door on a non-east face`);
    if ((m.figs?.penn?.garageDoors||0)<2) out.push('Pennsylvania/east elevation must show both east-facing garage doors');
  }
  if (key === 'd3-axon.html') {
    for (const id of ['massing-drawing','axon-drawing']) {
      const fig=m.figs?.[id];
      if (fig && (fig.doors < 4 || fig.windows < 10)) out.push(`${id} opening overlays ${fig.doors} doors/${fig.windows} windows; require >=4/10`);
    }
    const a=m.figs?.['massing-drawing'], b=m.figs?.['axon-drawing'];
    if (a&&b&&(a.doors!==b.doors||a.windows!==b.windows)) out.push(`A-401/A-402 opening count mismatch ${a.doors}/${a.windows} vs ${b.doors}/${b.windows}`);
    const truth=m.axonOpeningTruth;
    if (!truth || !truth.ok) out.push('A-401/A-402 door overlays are not derived from shared world opening geometry: '+JSON.stringify(truth||{}));
  }
  for (const item of result.consoleItems || []) out.push(item.type + ': ' + item.text);
  for (const item of (result.failedRequests || []).filter((x) => !isExpectedRequestFailure(x))) out.push('request ' + (item.status || item.error) + ': ' + (item.url || item.requestId || ''));
  for (const link of m.localLinks || []) {
    if (!link.ok) out.push(`broken local link ${link.href} -> ${link.status || link.error || 'failed'}`);
    else if (!link.anchorOk) out.push(`missing local anchor ${link.href}`);
  }
  if (packageMode && (m.externalLinks || []).length) out.push('standalone package contains external links: ' + m.externalLinks.join(' | '));
  if (key === 'd3-plan-closure.html') {
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
      if (!gate.wetCore || gate.wetCore.ok !== false || gate.wetCore.blocking !== false) out.push('wet-core/plumbing coordination must be a truthful non-blocking advisory for the current plan');
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
  const metrics = await evaluate(client, `(async () => {
    const doc = document.documentElement;
    const svgs = [...document.querySelectorAll('svg')].map((svg) => {
      const r = svg.getBoundingClientRect();
      return { aria: svg.getAttribute('aria-label') || '', width: Math.round(r.width), height: Math.round(r.height), visible: r.width > 40 && r.height > 40 };
    });
    const figs = {};
    ['penn','rear','north','south','site','axon','ground','upper','drawing','swept-path','bubble-drawing','massing-drawing','axon-drawing'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      figs[id] = { hasSvg: !!el.querySelector('svg'), text: el.innerText.trim().slice(0,160), width: Math.round(r.width), height: Math.round(r.height), doors: el.querySelectorAll('[data-opening="door"]').length, windows: el.querySelectorAll('[data-opening="window"]').length, garageDoors: el.querySelectorAll('[data-opening="garage-door"]').length };
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
        wetCore: g.checks?.wetCore || null,
      };
    })() : null;
    const externalLinks=[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')||'').filter((href)=>{
      if(!/^https?:/i.test(href)) return false;
      try{return new URL(href,location.href).origin!==location.origin}catch{return false}
    });
    const vehicleBodies=[...document.querySelectorAll('[data-vehicle-id="FS-SUV"]')].map(el=>({lengthFt:Number(el.getAttribute('data-length-ft')),widthFt:Number(el.getAttribute('data-width-ft')),sweepKind:el.getAttribute('data-sweep-kind')||'',turnRadiusFt:Number(el.getAttribute('data-turn-radius-ft'))}));
    const sweepEl=document.querySelector('#swept-path svg');
    const sweepMeta=sweepEl?{proofScope:sweepEl.getAttribute('data-proof-scope')||'',fullEnclosure:sweepEl.getAttribute('data-full-enclosure')==='true',garageDepthFt:Number(sweepEl.getAttribute('data-garage-depth-ft')),depthDeficitFt:Number(sweepEl.getAttribute('data-depth-deficit-ft')),poseCount:Number(sweepEl.getAttribute('data-sweep-pose-count')),arcPoseCount:Number(sweepEl.getAttribute('data-arc-pose-count')),shortTangentCount:Number(sweepEl.getAttribute('data-short-tangent-count')),turnRadiusFt:Number(sweepEl.getAttribute('data-turn-radius-ft')),minClearanceFt:Number(sweepEl.getAttribute('data-min-clearance-ft')),outboundProof:sweepEl.getAttribute('data-outbound-proof')||''}:null;
    const axonOpeningTruth=window.Lot2Design3&&window.Lot2Design3.OPENINGS&&window.Lot2Design3.projectAxonOpening?(()=>{
      const expected=window.Lot2Design3.OPENINGS.filter(o=>o.role==='entry'||o.role==='garage-overhead');
      const checks={};
      for(const id of ['massing-drawing','axon-drawing']){
        const root=document.getElementById(id); if(!root){checks[id]={ok:false,reason:'missing figure'};continue}
        const actual=[...root.querySelectorAll('[data-opening="door"]')];
        let ok=actual.length===expected.length; const details=[];
        for(const o of expected){
          const el=actual.find(x=>x.getAttribute('data-opening-id')===o.id); if(!el){ok=false;details.push(o.id+':missing');continue}
          if(el.getAttribute('data-opening-derived')!=='world'){ok=false;details.push(o.id+':not-derived')}
          const got=(el.getAttribute('points')||'').trim().split(/\s+/).map(pair=>pair.split(',').map(Number));
          const want=window.Lot2Design3.projectAxonOpening(o);
          const delta=Math.max(...want.map((p,i)=>Math.hypot(p[0]-(got[i]?.[0]??9999),p[1]-(got[i]?.[1]??9999))));
          if(delta>.2){ok=false;details.push(o.id+':projection-delta='+delta.toFixed(2))}
        }
        checks[id]={ok,details,count:actual.length};
      }
      return {ok:Object.values(checks).every(x=>x.ok),checks};
    })():null;
    const localLinks = (await Promise.all([...document.querySelectorAll('a[href]')].map(async (a) => {
      const href = a.getAttribute('href') || '';
      if (!href || href === '#' || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return null;
      const u = new URL(href, location.href);
      if (u.origin !== location.origin) return null;
      try {
        const res = await fetch(u.pathname + u.search, { cache: 'no-store' });
        let anchorOk = true;
        if (res.ok && u.hash) {
          const text = await res.text();
          const parsed = new DOMParser().parseFromString(text, 'text/html');
          anchorOk = !!parsed.getElementById(decodeURIComponent(u.hash.slice(1)));
        }
        return { href, target: u.pathname + u.hash, ok: res.ok, status: res.status, anchorOk };
      } catch (err) {
        return { href, target: u.pathname + u.hash, ok: false, status: 0, anchorOk: false, error: String(err) };
      }
    }))).filter(Boolean);
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
      localLinks,
      externalLinks,
      vehicleBodies,
      sweepMeta,
      axonOpeningTruth,
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
    for (const [id, name] of [['massing-drawing','massing'], ['axon-drawing','axon']]) {
      await evaluate(client, `document.querySelector('#${id}').scrollIntoView({block:'center'})`);
      await new Promise((r) => setTimeout(r, 250));
      const clip = await evaluate(client, `(() => { const r = document.querySelector('#${id}').getBoundingClientRect(); return {x:Math.max(0,r.left + window.scrollX),y:Math.max(0,r.top + window.scrollY),width:r.width,height:r.height,scale:1}; })()`);
      const data = await client.send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: true, fromSurface: true });
      const file = `${outDir}/desktop-1440-${name}-drawing.png`;
      await writeFile(file, Buffer.from(data.data, 'base64'));
      clips.push(file);
    }
  }
  if (page === 'd3-site.html' && viewport.name === 'desktop-1440') {
    await evaluate(client, `document.querySelector('#swept-path').scrollIntoView({block:'center'})`);
    await new Promise((r) => setTimeout(r, 250));
    const clip = await evaluate(client, `(() => { const r = document.querySelector('#swept-path').getBoundingClientRect(); return {x:Math.max(0,r.left + window.scrollX),y:Math.max(0,r.top + window.scrollY),width:r.width,height:r.height,scale:1}; })()`);
    const data = await client.send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: true, fromSurface: true });
    const file = `${outDir}/desktop-1440-swept-path.png`;
    await writeFile(file, Buffer.from(data.data, 'base64'));
    clips.push(file);
  }
  if (page === 'd3-plan-closure.html' && viewport.name === 'desktop-1440') {
    await evaluate(client, `document.querySelector('#bubble-drawing').scrollIntoView({block:'center'})`);
    await new Promise((r) => setTimeout(r, 250));
    const clip = await evaluate(client, `(() => { const r = document.querySelector('#bubble-drawing').getBoundingClientRect(); return {x:Math.max(0,r.left + window.scrollX),y:Math.max(0,r.top + window.scrollY),width:r.width,height:r.height,scale:1}; })()`);
    const data = await client.send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: true, fromSurface: true });
    const file = `${outDir}/desktop-1440-bubble-drawing.png`;
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
  console.log(JSON.stringify({ mode: packageMode ? 'standalone-package' : 'source', outDir, base, resultFile, pages, viewports: viewports.map((v) => v.name), failures }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  chrome.kill('SIGTERM');
  await new Promise((resolve) => {
    if (chrome.exitCode != null || chrome.signalCode != null) return resolve();
    const timer = setTimeout(resolve, 1500);
    chrome.once('exit', () => { clearTimeout(timer); resolve(); });
  });
  if (localServer) await new Promise((resolve) => localServer.server.close(resolve));
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
      break;
    } catch (err) {
      if (attempt === 4) throw err;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
}
