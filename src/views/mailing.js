const html = require('choo/html')

export default function mailingView (state, emit) {
  return html`
  <div>
    <label>
      <input type="checkbox" name="mailing" onchange=${mailingBoxClick} checked="checked"/>
      Je souhaite être averti par mail des résultats du concours
    </label>
    <input type="email" name="email" class="btn hidden jelly" placeholder="Email" />
  </div>
  `
  function mailingBoxClick (event) {
    const method = event.target.checked ? 'add' : 'remove'
    const emailInput = document.querySelector('input[type="email"]')
    emailInput.classList[method]('jelly')
    emailInput.focus()
  }
}
