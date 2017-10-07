import html from 'choo/html'
import previousColorView from './previousColor'

export default function colorHistoryView (state, emit) {
  const previousColorViews = state.previousColors.map(color => {
    return previousColorView(color, emit)
  })
  return html`
    <div>
      <span>Couleurs utilisées : </span>
      <ul class="colorHistory">${previousColorViews}</ul>
    </div>
  `
}
