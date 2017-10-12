import onload from 'on-load'
import gallery from './gallery'
const html = require('choo/html')

export default function homeView (state, emit) {
  const view = html`
    <div class="content">
      <span>Coloriez Wilson ou votez pour votre préféré</span>
      <div class="home-nav">
        <a class="btn" href="/new">Créer mon Wilson !</a>
      </div>
      ${gallery(state, emit)}
    </div>
  `
  onload(view, init)
  return view

  function init () {
    window.fetch('/wilsons').then(data => data.json()).then(data => {
      emit('wilsons:loaded', data)
    })
  }
}
