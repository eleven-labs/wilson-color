const html = require('choo/html')

export default function mailingView (state, emit) {
  const emailInput = html`<input type="email" name="email" class="btn hidden" placeholder="Email" />`
  return html`
  <div>
    <label>
      <input type="checkbox" name="mailing" onchange=${mailingBoxClick} />
      Je souhaite être averti par mail des résultats du concours
    </label>
    ${emailInput}
  </div>
  `
  function mailingBoxClick (event) {
    const method = event.target.checked ? 'add' : 'remove'
    emailInput.classList[method]('jelly')
    emailInput.focus()
  }
}
