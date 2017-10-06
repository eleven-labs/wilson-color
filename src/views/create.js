const html = require('choo/html')
export default function homeView (state, emit) {
  return html`
    <div>
      <span>Utilisez la palette pour sélectioner une couleur, puis cliquez sur Wilson pour le colorier</span>
      <div>
        Palette : <input type="color" class="btn" value="${state.selectedColor}" onchange=${colorInputChanged} /><br />
        <button class="btn" onclick=${outlineButtonClick}>Contour</button>
        <button class="btn">Arrière-plan</button>
        <button class="btn">Réinitialiser</button>
      </div>
      <div>
        <object id="wilson" data="wilson.svg" type="image/svg+xml" onload=${wilsonLoaded}></object>
      </div>
    </div>
  `
  function outlineButtonClick () {
    emit('paint', {elementId: 'path1019', color: state.selectedColor})
  }

  function colorInputChanged (event) {
    emit('color:change', event.target.value)
  }

  function wilsonLoaded (event) {
    const pathArray = Array.from(event.currentTarget.contentDocument.getElementsByTagName('path'))
    pathArray.forEach(function (path) {
      path.onclick = function (event) {
        emit('paint', {elementId: event.currentTarget.id, color: state.selectedColor})
      }
    })
  }
}
