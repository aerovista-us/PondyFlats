/**
 * Workbench focus-page shell — mounts engine SVGs on generated site / plans /
 * elevs / axon HTML. Hub (design-N.html) stays authored and does not use this.
 */
(function () {
  const engineName = document.body && document.body.getAttribute('data-engine');
  const pageId = document.body && document.body.getAttribute('data-page');
  const D = engineName && window[engineName];
  if (!D) return;

  const gate = D.analyze ? D.analyze() : {};
  const C = gate.client || {};
  const badge = document.getElementById('statusBadge');
  if (badge) {
    badge.className = 'badge ' + (C.klass || 'cond');
    badge.textContent = C.badge || 'Concept package';
  }
  const rev = document.getElementById('revLine');
  if (rev) rev.textContent = D.REV || '';

  if (pageId === 'plans' && D.ROOM_LEGEND && D.ROOM_FILL) {
    const legend = document.getElementById('roomLegend');
    if (legend) {
      legend.innerHTML = D.ROOM_LEGEND.map((item) =>
        `<li><span class="sw" style="background:${D.ROOM_FILL[item.kind]}"></span>${item.label}</li>`).join('');
    }
  }

  document.querySelectorAll('figure.draw[data-render]').forEach((el) => {
    const name = el.getAttribute('data-render');
    if (!name || !D.renderNamed) return;
    const svg = D.renderNamed(name);
    const cap = el.querySelector('figcaption');
    el.insertAdjacentHTML('afterbegin', svg);
    if (cap) el.appendChild(cap);
  });
})();
