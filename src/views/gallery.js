import onload from 'on-load'
import wilsonThumbnail from './wilsonThumbnail'
const html = require('choo/html')

export default function gallery(state, emit) {
  const wilsonList = state.wilsons.list.map(wilson => {
    return wilsonThumbnail(wilson, emit)
  })
  const view = html`
    <div class="gallery">
      <div class="list">${wilsonList}</div>
      <button class="btn" onclick=${seeMore}>Voir plus</button>
    </div>

  `
  onload(view, init)
  return view

  function init() {
    window.fetch('/wilsons').then(data => data.json()).then(data => {
      if (data.error) {
        emit('wilsons:error', data.error)
      } else {
        emit('wilsons:loaded', data)
        seeMore()
      }
    })
  }

  function seeMore() {
    emit('render')
    window
      .fetch(
        `/wilsons?maxId=${state.wilsons.list[state.wilsons.list.length - 1].id}`
      )
      .then(data => data.json())
      .then(data => {
        data.error
          ? emit('wilsons:error', data.error)
          : emit('wilsons:updated', data)
      })
  }
}
