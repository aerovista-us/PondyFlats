# Delivery — Polish, Export, Present

After Package, every new design gets a **client-readable polish**, a **standalone export**, and a **separate presenter kit**. The client does not receive the workbench.

Canonical order: [`lot2-design-pipeline.md`](lot2-design-pipeline.md)

```
Package → Polish → Export → Present → (Freeze only if asked)
```

## Polish

- Client English (no camelCase gate keys as badges).
- Print / save PDF on the hub.
- Grouped pages: hub · site · plans · elevs · axon.
- No workbench, archive, lab, or GitHub conflict catalog on the package.
- Geometry does not move. Presentation `REV` may bump.

Live hubs: [`../r51e-deliverable.html`](../r51e-deliverable.html) · [`../design-2.html`](../design-2.html)

## Export

```
npm run export
```

Writes `packages/design-1-client`, `packages/design-1-presenter`, `packages/design-2-client`, `packages/design-2-presenter`.

Client folder: open `index.html`. No internet. No workbench. `Lot2PipelineContract.auditExport` fails if workbench/archive files leak in.

## Present

Sibling folder, never inside the client zip.

| Kit | Guide | One-pager |
| --- | ----- | --------- |
| Design 1 | [`../presenter-design-1.html`](../presenter-design-1.html) | `packages/design-1-presenter/talking-points.html` |
| Design 2 | [`../presenter-design-2.html`](../presenter-design-2.html) | `packages/design-2-presenter/talking-points.html` |

Shared screen = **client** `index.html`. Your laptop = **presenter** guide.

## Internal vs public

| Surface | Audience |
| ------- | -------- |
| [`../workbench.html`](../workbench.html) | Studio only |
| [`../lot.html`](../lot.html) | Public Lot step (custom shapes + grouped brief categories) |
| [`../index.html`](../index.html) | Public home for the two Lot 2 packages |
