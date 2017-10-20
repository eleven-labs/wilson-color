import html from 'choo/html'

export default function savingView(state, emit) {
  return html`
    <div class="card saving jelly">
      <button class="btn close" onclick=${closeButtonClick}></button>
      success !
      <div>
        <a class="btn" href="/my-wilson?id=${state.success}">Valider</a>
      </div>
    </div>
  `

  function closeButtonClick() {
    emit('success:visible', false)
  }
}
