import html from 'choo/html'
import 'whatwg-fetch'
import mailingView from './mailing'

export default function savingView (state, emit) {
  return html`
    <div class="card saving hidden">
      <button class="btn close" onclick=${closeButtonClick}></button>
      <form>
        ${mailingView(state, emit)}
        <div class="g-recaptcha" data-sitekey="6LeJmTMUAAAAAG8o18dRoAYqajyBvpjCbBer-7S8"></div>
        <button class="btn" onclick=${saveFormSubmit}>Valider</button>
      </form>
    </div>
  `

  function saveFormSubmit (event) {
    event.preventDefault()
    window.fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'g-recaptcha-response': document.getElementById('g-recaptcha-response').value,
        wilsonData: state.wilson
      })
    }).then(response => response.json()).then(data => {
      if (data.formSubmit) {
        hide()
      }
    })
  }

  function closeButtonClick () {
    hide()
  }

  function hide () {
    const view = document.getElementsByClassName('saving')[0]
    view.classList.remove('jelly')
    view.classList.add('hidden')
  }
}
