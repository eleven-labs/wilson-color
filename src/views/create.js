import html from 'choo/html'
import colorHistoryView from './colorHistory'
import savingView from './saving'
import wilsonLib from '../lib/wilson'
import Sticky from 'sticky-js'

export default function createView(state, emit) {
  return html`
    <div class="content">
      <div class="card">Utilisez la palette pour sélectioner une couleur, puis cliquez sur Wilson pour le colorier</div>
      <div class="card toolbox">
        <div>
          Couleur active : <input type="color" class="btn" value="${state.selectedColor}" onchange=${colorInputChanged} />${colorHistoryView(
    state,
    emit
  )}
        </div>
        <div>
          <button class="btn" onclick=${resetButtonClick}>Réinitialiser</button>
          <button class="btn btn-save" onclick=${saveButtonClick}>Enregistrer</button>
        </div>
      </div>
      ${state.saving.isSaving ? savingView(state, emit) : null}
      <div class="wilson-container">
        <object id="wilson" data="images/wilson.svg" type="image/svg+xml" onload=${wilsonLoaded}></object>
      </div>
    </div>
  `

  function colorInputChanged(event) {
    emit('colorSelected', event.target.value)
  }

  function resetButtonClick() {
    window.location.reload()
  }

  function saveButtonClick() {
    emit('save:visible', true)
    console.log(state)
  }

  function wilsonLoaded() {
    initSticky()
    wilsonLib.getShapes().forEach(function(shape) {
      shape.onclick = function(event) {
        if (event.currentTarget.id !== 'path1019') {
          emit('paint', {
            elementId: event.currentTarget.id,
            color: state.selectedColor
          })
        }
      }
    })
    wilsonLib.repaint(state.wilson)
  }

  function initSticky() {
    const stickyToolbox = new Sticky('.toolbox')
    return stickyToolbox
  }
}
