import html from 'choo/html'
import previousColorView from './previousColor'

export default function colorHistoryView (state, emit, selected) {
  const previousColorViews = state.map(color => {
    return selected === color ? previousColorView(color, emit, true) : previousColorView(color, emit, false)
  })
  return html`
    <div>
      <ul class="colorHistory">${previousColorViews}</ul>
    </div>
  `
}
