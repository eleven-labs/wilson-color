import html from 'choo/html'

export default function savingView(state, emit) {
  return html`
    <div class="card saving jelly">
      <button class="btn close" onclick=${closeButtonClick}></button>
      Félicitation tu viens de créer ton Wilson! Pour participer au concours, appuie sur le bouton "Valider", et partage ton Wilson sur Twitter.
      <div>
        <a class="btn" onclick=${closeButtonClick} href="/my-wilson?id=${state.success}">Valider</a>
      </div>
    </div>
  `

  function closeButtonClick() {
    emit('success:visible', false)
    emit('created:success', true)
  }
}
