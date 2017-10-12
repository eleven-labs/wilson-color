import 'whatwg-fetch'
import html from 'choo/html'
import loadScript from 'load-script'
import mailingView from './mailing'
import onload from 'on-load'

export default function savingView (state, emit) {
  const view = html`
    <div class="card saving jelly">
      <h2>Nommez votre création !</h2>
      <input type="text" name="name" class="btn" placeholder="Nom"/>
      <button class="btn close" onclick=${closeButtonClick}></button>
      <form>
      <div id="recaptchaContainer"></div>
      <span class="hidden error">Cochez la case reCAPTCHA</span>
      ${mailingView(state, emit)}
        <button class="btn" onclick=${saveFormSubmit}>Valider</button>
      </form>
    </div>
  `
  onload(view, init)
  return view

  function init () {
    initRecaptcha()
  }

  function initRecaptcha () {
    const recaptchaDiv = html`<div class="g-recaptcha" data-sitekey="6LeJmTMUAAAAAG8o18dRoAYqajyBvpjCbBer-7S8"></div>`
    document.getElementById('recaptchaContainer').appendChild(recaptchaDiv)
    loadScript('https://www.google.com/recaptcha/api.js')
  }
  function saveFormSubmit (event) {
    event.preventDefault()
    const mailing = document.querySelector('input[type="checkbox"]').checked
    const email = document.querySelector('input[type="email"]').value
    const name = document.querySelector('input[name="name"]').value
    window.fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'g-recaptcha-response': document.getElementById('g-recaptcha-response').value,
        wilsonData: state.wilson,
        email: mailing ? email : 'no',
        name
      })
    }).then(response => response.json()).then(data => {
      if (data.formSubmit) {
        emit('save:visible', false)
      } else {
        const errorSpan = document.getElementsByClassName('error').item(0)
        errorSpan.classList.add('jelly')
      }
    })
  }

  function closeButtonClick () {
    emit('save:visible', false)
  }
}
