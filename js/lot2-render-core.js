/*
 * Pondy Flats — deterministic render core
 * Geometry in feet. No concept geometry is invented here.
 * Pennsylvania = RIGHT. North / Rear = LEFT.
 */
(function (root) {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';

  function svgEl(name, attrs = {}, text = null) {
    const el = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
    if (text != null) el.textContent = text;
    return el;
  }

  function rectPoly(x, y, w, h) {
    return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  }

  function polyArea(poly) {
    let a = 0;
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i];
      const q = poly[(i + 1) % poly.length];
      a += p[0] * q[1] - q[0] * p[1];
    }
    return Math.abs(a) / 2;
  }

  function normalizeFootprint(item) {
    if (Array.isArray(item.poly)) return item.poly.map(p => [Number(p[0]), Number(p[1])]);
    if ([item.x, item.y, item.w, item.h].every(Number.isFinite)) return rectPoly(item.x, item.y, item.w, item.h);
    throw new Error(`Invalid footprint: ${item.name || 'unnamed'}`);
  }

  function bounds(polys) {
    const pts = polys.flat();
    const xs = pts.map(p => p[0]);
    const ys = pts.map(p => p[1]);
    return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
  }

  function createMapper(width, height, survey, pad = 42) {
    const b = bounds([survey]);
    const sx = (width - pad * 2) / (b.maxX - b.minX);
    const sy = (height - pad * 2) / (b.maxY - b.minY);
    const s = Math.min(sx, sy);
    return {
      scale: s,
      x: v => pad + (v - b.minX) * s,
      y: v => pad + (v - b.minY) * s,
      points: poly => poly.map(([x, y]) => `${pad + (x - b.minX) * s},${pad + (y - b.minY) * s}`).join(' '),
    };
  }

  function addPolygon(svg, map, poly, cls, label, style = {}) {
    const g = svgEl('g', { class: cls });
    const p = svgEl('polygon', {
      points: map.points(poly),
      fill: style.fill || 'none',
      stroke: style.stroke || '#172033',
      'stroke-width': style.strokeWidth || 1.6,
      'stroke-dasharray': style.dash || '',
      'vector-effect': 'non-scaling-stroke',
    });
    g.appendChild(p);
    if (label) {
      const cx = poly.reduce((s, pt) => s + pt[0], 0) / poly.length;
      const cy = poly.reduce((s, pt) => s + pt[1], 0) / poly.length;
      g.appendChild(svgEl('text', {
        x: map.x(cx), y: map.y(cy),
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: style.text || '#172033', 'font-size': style.fontSize || 11,
        'font-weight': 700,
      }, label));
    }
    svg.appendChild(g);
    return g;
  }

  function addPath(svg, map, path, style = {}) {
    const pts = path.map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(' ');
    const line = svgEl('polyline', {
      points: pts,
      fill: 'none',
      stroke: style.stroke || '#3568b8',
      'stroke-width': style.strokeWidth || 3,
      'stroke-dasharray': style.dash || '',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'vector-effect': 'non-scaling-stroke',
    });
    svg.appendChild(line);
    return line;
  }

  function renderTopDown(target, config, opts = {}) {
    if (!target) throw new Error('renderTopDown target required');
    const width = opts.width || 1200;
    const height = opts.height || 620;
    const survey = config.survey;
    if (!Array.isArray(survey) || survey.length < 3) throw new Error('survey polygon required');

    const svg = svgEl('svg', { viewBox: `0 0 ${width} ${height}`, role: 'img', 'aria-label': opts.title || config.name || 'Lot 2 plan' });
    svg.style.width = '100%';
    svg.style.height = 'auto';
    svg.style.background = opts.background || '#f7f4ec';
    const map = createMapper(width, height, survey, opts.pad || 48);

    addPolygon(svg, map, survey, 'survey', '', { fill: '#f3edda', stroke: '#d62828', strokeWidth: 2.4 });
    if (config.setbackPoly) addPolygon(svg, map, config.setbackPoly, 'setback', '', { fill: 'rgba(78,124,74,.05)', stroke: '#568057', strokeWidth: 1.5, dash: '7 5' });

    (config.upper || []).forEach(item => {
      const poly = normalizeFootprint(item);
      addPolygon(svg, map, poly, 'upper', `${item.name || 'UPPER'}\n${Math.round(polyArea(poly))} SF`, { fill: 'rgba(67,105,165,.08)', stroke: '#4067a5', strokeWidth: 1.5, dash: '7 5', text: '#284b84' });
    });

    (config.ground || []).forEach(item => {
      const poly = normalizeFootprint(item);
      addPolygon(svg, map, poly, 'ground', `${item.name || 'GROUND'}\n${Math.round(polyArea(poly))} SF`, { fill: '#e6bf72', stroke: '#6b5126', strokeWidth: 1.8 });
    });

    (config.garages || []).forEach(item => {
      const poly = normalizeFootprint(item);
      addPolygon(svg, map, poly, 'garage', `${item.name || 'GARAGE'}\n${Math.round(polyArea(poly))} SF`, { fill: '#9fb0bf', stroke: '#34495e', strokeWidth: 1.8 });
    });

    (config.paths || []).forEach((item, i) => addPath(svg, map, item.path, { stroke: item.stroke || (i ? '#b84f3f' : '#3568b8'), strokeWidth: item.strokeWidth || 3, dash: item.dash || '' }));

    svg.appendChild(svgEl('text', { x: width - 14, y: height / 2, transform: `rotate(90 ${width - 14} ${height / 2})`, 'text-anchor': 'middle', fill: '#9e1f1f', 'font-size': 13, 'font-weight': 800 }, 'PENNSYLVANIA AVENUE · SOUTH / FRONT'));
    svg.appendChild(svgEl('text', { x: 16, y: height / 2, transform: `rotate(-90 16 ${height / 2})`, 'text-anchor': 'middle', fill: '#183b68', 'font-size': 13, 'font-weight': 800 }, 'NORTH / REAR'));

    target.replaceChildren(svg);
    return { svg, map };
  }

  function svgString(svg) {
    return new XMLSerializer().serializeToString(svg);
  }

  function downloadSvg(svg, filename = 'lot2-plan.svg') {
    const blob = new Blob([svgString(svg)], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function toThreeData(config) {
    const convert = (items, kind) => (items || []).map(item => ({
      name: item.name || kind,
      kind,
      footprint: normalizeFootprint(item),
      area: polyArea(normalizeFootprint(item)),
      z0: Number(item.z0 || 0),
      z1: Number(item.z1 || item.height || 10),
    }));
    return {
      name: config.name || 'Lot 2 concept',
      units: 'feet',
      orientation: { pennsylvania: 'right', northRear: 'left' },
      survey: config.survey.map(p => [...p]),
      setbacks: config.setbackPoly ? config.setbackPoly.map(p => [...p]) : null,
      objects: [...convert(config.ground, 'ground'), ...convert(config.garages, 'garage'), ...convert(config.upper, 'upper')],
      paths: (config.paths || []).map(p => ({ name: p.name || 'path', path: p.path.map(q => [...q]) })),
    };
  }

  root.Lot2RenderCore = Object.freeze({ rectPoly, polyArea, normalizeFootprint, renderTopDown, svgString, downloadSvg, toThreeData });
})(typeof window !== 'undefined' ? window : globalThis);
