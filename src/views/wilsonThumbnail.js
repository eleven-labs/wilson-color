const html = require('choo/html')

export default function wilsonThumbnail(state, emit) {
  return html`
    <div class="wilson">
      <img src="${state.media}" />
        <div class="infos">
          <div class="author">créé par ${state.screen_name || 'Wilson'}</div>
          <div class="vote-container">
            <a
              href="https://twitter.com/intent/like?tweet_id=${state.id}"
              target="_blank"
              id="${state.uid}"
              class="btn-vote">
              <span>♥ ${state.vote || '0'}</span>
            </a>
          </div>
        </div>
    </div>
  `
}
