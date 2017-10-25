import html from 'choo/html'

export default function previousColorView (color, emit, focused) {
  return html`
    <li style="background-color: ${color}; border-width: 2px; border-color: ${focused ? 'red' : 'yellow'}" onclick=${previousColorClick} class="jelly"></li>
  `
  function previousColorClick () {
    emit('colorSelected', color)
  }
}
