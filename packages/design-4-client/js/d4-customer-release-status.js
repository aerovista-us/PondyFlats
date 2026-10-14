/* Pondy Design 4 customer-release contract. Geometry model claims are NOT publication approval. */
(function (global) {
  'use strict';
  const release = Object.freeze({
    schemaVersion: 'pondy-design-release-v1',
    projectId: 'pondy-lot2',
    designId: 'design-4',
    releaseStatus: 'CONDITIONAL_CONCEPT',
    conceptOnly: true,
    approvedForConstruction: false,
    reportRevision: null,
    approvedCandidateSignature: null,
    circulation: Object.freeze({
      inbound: 'FOUR_STALL_ARRIVALS_MODELED',
      outbound: 'OPEN_NOT_PROVEN',
      fullPass: false
    }),
    roof: Object.freeze({
      modelSourceFile: 'js/lot2-design-4-roof-sot.js',
      modelRevision: 'D4-ROOF-SOT-v1.1',
      modelClaims: 'FOUR_LOCKED_OWNER_RECORDS_AND_SOLVED_HOME_B_VALLEY',
      releaseVerdict: 'REVIEW_REQUIRED',
      authorityReconciled: false,
      customerPublicationAllowed: false,
      remainingChecks: Object.freeze([
        'Exact current candidate/owner geometry signature and garage rotation lock',
        'Independent Home B plane/valley/junction validation',
        'Off-center or out-of-footprint ridge guards',
        'North elevation and axon view-depth/occlusion',
        'Current eave/fascia and surface-extension model',
        'Exact-head rendered views, report export and approval'
      ])
    }),
    professionalAcceptance: Object.freeze({
      structural: false, drainage: false, zoning: false,
      fireAccess: false, permit: false, ahj: false
    })
  });
  function apply() {
    if (typeof document === 'undefined') return;
    const strings = {
      'roof-status': 'Roof release: REVIEW REQUIRED',
      'roof-detail': 'A Design 4 roof source file contains four owner roof records labeled LOCKED and a solved Home B valley. Those model claims have not yet been reconciled with the exact current candidate, view-depth/occlusion, eave/fascia and customer publication gates. Some model roof lines may be visible, but the roof is NOT an accepted construction or permit drawing.',
      'circulation-status': '4 / 4 inbound modeled · outbound proof OPEN',
      'release-status': 'CONDITIONAL CONCEPT · professional review pending'
    };
    for (const [key, value] of Object.entries(strings)) {
      document.querySelectorAll('[data-d4-release="' + key + '"]').forEach(node => { node.textContent = value; });
    }
  }
  global.PondyD4Release = release;
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
    else apply();
  }
})(typeof window === 'undefined' ? globalThis : window);
