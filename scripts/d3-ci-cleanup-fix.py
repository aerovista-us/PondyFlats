from pathlib import Path

path = Path('scripts/d3-render-qa.mjs')
s = path.read_text()
old = """} finally {
  chrome.kill('SIGTERM');
  if (localServer) await new Promise((resolve) => localServer.server.close(resolve));
  await rm(profile, { recursive: true, force: true });
}
"""
new = """} finally {
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
"""
if old not in s:
    raise SystemExit('missing Chromium cleanup anchor')
path.write_text(s.replace(old, new, 1))
print('Chromium cleanup hardened')
