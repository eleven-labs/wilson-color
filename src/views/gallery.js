import onload from 'on-load'
import wilsonThumbnail from './wilsonThumbnail'
const html = require('choo/html')

export default function gallery (state, emit) {
  const wilsonList = state.wilsons.map(wilson => {
    return wilsonThumbnail(wilson, emit)
  })
  const view = html`
    <div class="gallery">
      ${wilsonList}
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
