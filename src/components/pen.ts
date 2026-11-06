/** Measures an SVG stroke so the `.pen-draw` CSS animation can draw it in. */
export function penRef(el: SVGGeometryElement | null) {
  if (el) el.style.setProperty('--len', `${Math.ceil(el.getTotalLength()) + 1}`);
}
