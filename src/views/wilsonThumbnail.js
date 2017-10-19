const html = require('choo/html')
const siteKey = '6Lc57TQUAAAAAPhRKtmHlNI0MWtGwDY5inl-upQ6'

export default function wilsonThumbnail(state, emit) {
  return html`
    <div class="wilson">
      <img src="images/${state.uid}.png" />
      <div class="infos">
        <div class="author">créé par ${state.name || 'Wilson'}</div>
        <div class="vote-container">
          <button
            id="${state.uid}"
            class="btn-vote g-recaptcha">
            <img class="votes" src='images/vote.png'/>
          </button>
          <span>${state.vote || '0'}</span>
        </div>
      </div>
    </div>
  `
}
