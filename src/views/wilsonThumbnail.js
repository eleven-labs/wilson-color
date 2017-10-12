const html = require('choo/html')

export default function wilsonThumbnail (state, emit) {
  return html`
    <div class="wilson">
      <img src="images/${state.uid}.png" />
      <div>${state.name || 'Wilson'}</div>
    </div>
  `
}
