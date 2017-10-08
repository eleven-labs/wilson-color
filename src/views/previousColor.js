import html from 'choo/html'

export default function previousColorView (color, emit) {
  return html`
    <li style="background-color: ${color}" onclick=${previousColorClick} class="jelly"></li>
  `
  function previousColorClick () {
    emit('colorSelected', color)
  }
}
