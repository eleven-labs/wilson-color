import html from 'choo/html'
import colorHistoryView from './colorHistory'
import savingView from './saving'
import wilsonLib from '../lib/wilson'
import loadScript from 'load-script'
import Sticky from 'sticky-js'

export default function createView (state, emit) {
  return html`
    <div class="content">
      <div class="card">Utilisez la palette pour sélectioner une couleur, puis cliquez sur Wilson pour le colorier</div>
      <div class="card toolbox">
        <div>
          Couleur active : <input type="color" class="btn" value="${state.selectedColor}" onchange=${colorInputChanged} />${colorHistoryView(state, emit)}
        </div>
        <div>
          <button class="btn" onclick=${outlineButtonClick}>Contour</button>
          <button class="btn">Arrière-plan</button>
          <button class="btn" onclick=${resetButtonClick}>Réinitialiser</button>
          <button class="btn btn-save" onclick=${saveButtonClick}>Enregistrer</button>
        </div>
      </div>
      ${savingView(state, emit)}
      <div class="wilson-container">
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

  function saveButtonClick () {
    const saving = document.getElementsByClassName('saving')[0]
    saving.classList.add('jelly')
    saving.classList.remove('hidden')
    console.log(state)
  }

  function wilsonLoaded () {
    initRecaptcha()
    initSticky()
    wilsonLib.getShapes().forEach(function (shape) {
      shape.onclick = function (event) {
        emit('paint', {elementId: event.currentTarget.id, color: state.selectedColor})
      }
    })
    wilsonLib.repaint(state.wilson)
  }

  function initRecaptcha () {
    loadScript('https://www.google.com/recaptcha/api.js')
  }

  function initSticky () {
    const stickyToolbox = new Sticky('.toolbox')
    return stickyToolbox
  }
}
