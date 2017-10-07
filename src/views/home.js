const html = require('choo/html')
export default function homeView (state, emit) {
  return html`
    <div class="content">
      <span>Coloriez Wilson ou votez pour votre préféré</span>
      <div class="home-nav">
        <a class="btn" href="/new">Colorier</a>
        <a class="btn" href="/gallery">Gallerie</a>
      </div>
    </div>
  `
}
