import 'whatwg-fetch'
import html from 'choo/html'
import loadScript from 'load-script'
import mailingView from './mailing'
import onload from 'on-load'

const siteKey = '6Lc57TQUAAAAAPhRKtmHlNI0MWtGwDY5inl-upQ6'

export default function savingView(state, emit) {
  const view = html`
    <div class="card saving jelly">
      <h2>Nommez votre création !</h2>
      <input type="text" name="name" class="btn" placeholder="Nom"/>
      <button class="btn close" onclick=${closeButtonClick}></button>
      <form>
      <span class="hidden error">Cochez la case reCAPTCHA</span>
      ${mailingView(state, emit)}
      <button
        id="submit-wilson"
        class="btn g-recaptcha">
        Submit
        </button>
      </form>
    </div>
  `
  onload(view, init)
  return view

  function init() {
    window.initRecaptcha = initRecaptcha

    loadScript(
      `https://www.google.com/recaptcha/api.js?onload=initRecaptcha&render=explicit`
    )
  }

  function initRecaptcha() {
    const el = document.querySelector('.g-recaptcha')
    grecaptcha.render(el, {
      sitekey: siteKey,
      callback: saveFormSubmit
    })
  }

  function saveFormSubmit() {
    const mailing = document.querySelector('input[type="checkbox"]').checked
    const email = document.querySelector('input[type="email"]').value
    const name = document.querySelector('input[name="name"]').value
    window
      .fetch('/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'g-recaptcha-response': document.getElementById(
            'g-recaptcha-response'
          ).value,
          wilsonData: state.wilson,
          email: mailing ? email : 'no',
          name
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.formSubmit) {
          emit('save:visible', false)
        } else {
          const errorSpan = document.getElementsByClassName('error').item(0)
          errorSpan.classList.add('jelly')
        }
      })
  }

  function closeButtonClick() {
    emit('save:visible', false)
  }
}
