const html = require('choo/html')
export default function homeView (state, emit) {
  return html`
    <div class="content">
      <span>Votez pour votre Wilson préféré</span>
    </div>
  `
}
