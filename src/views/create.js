import html from 'choo/html'
import colorHistoryView from './colorHistory'
import wilsonLib from '../lib/wilson'

export default function createView (state, emit) {
  return html`
    <div>
      <span>Utilisez la palette pour sélectioner une couleur, puis cliquez sur Wilson pour le colorier</span>
      <div>
        <div>
          Couleur active : <input type="color" class="btn" value="${state.selectedColor}" onchange=${colorInputChanged} />${colorHistoryView(state, emit)}
        </div>
        <div>
          <button class="btn" onclick=${outlineButtonClick}>Contour</button>
          <button class="btn">Arrière-plan</button>
          <button class="btn" onclick=${resetButtonClick}>Réinitialiser</button>
        </div>
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
    emit('colorSelected', event.target.value)
  }

  function resetButtonClick () {
    window.location.reload()
  }

  function wilsonLoaded () {
    wilsonLib.getShapes().forEach(function (shape) {
      shape.onclick = function (event) {
        emit('paint', {elementId: event.currentTarget.id, color: state.selectedColor})
      }
    })
  }
}
