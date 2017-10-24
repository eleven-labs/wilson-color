import html from 'choo/html'
import onload from 'on-load'
import loadScript from 'load-script'

export default function homeView(state, emit) {
  const url = window.location.href

  const view = html`
    <div>
      <div class="home-nav">
        <a class="btn" href="/">Retour</a>
      </div>
      <div class="my-wilson">
        <img src="images/${state.myWilson.uid}.png" />
          <div class="infos">
            <div class="author">créé par ${state.myWilson.name ||
              'Wilson'}</div>
            <div class="vote-container">
              <span>${state.myWilson.vote || '0'}</span>
            </div>
          </div>
          <div>
            <a
              class="twitter-share-button"
              target="_blank"
              href="https://twitter.com/share"
              data-url="${url}"
              data-size="large"
              data-text="Votez pour moi !"
              data-hashtags="WilsonColor, ElevenLabs"
              data-via="Eleven_Labs">
            </a>
          </div>
      </div>
    </div>
  `
  onload(view, init)
  return view

  function init() {
    loadScript('//platform.twitter.com/widgets.js')
    const searchParams = new URLSearchParams(window.location.search)
    const wilsonId = searchParams.get('id')

    window
      .fetch(`/wilsons/${wilsonId}`)
      .then(data => data.json())
      .then(data => {
        emit('my-wilson:loaded', data)
        addMetas()
      })
      .catch(err => console.log(err))
  }

  function addMetas() {
    document.querySelector('meta[property="og:url"]').content =
      window.location.href
    document.querySelector('meta[property="og:image"]').content = `${window
      .location.hostname}/image/${state.myWilson.uid}.png`
    document.querySelector('meta[name="twitter:image"]').content = `${window
      .location.hostname}/image/${state.myWilson.uid}.png`
  }
}
