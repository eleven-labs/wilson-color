import html from 'choo/html'
import onload from 'on-load'
import loadScript from 'load-script'

const siteKey = '6Lc57TQUAAAAAPhRKtmHlNI0MWtGwDY5inl-upQ6'

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
              <button
                id="${state.myWilson.uid}"
                class="btn-vote g-recaptcha">
                <img class="votes" src='images/vote.png'/>
              </button>
              <span>${state.myWilson.vote || '0'}</span>
            </div>
          </div>
          <div>
            <a
              class="fb-xfbml-parse-ignore"
              target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=${url}">
                <img width="20" height="20" src="/images/facebook.svg">
            </a>
            <a
              target="_blank"
              href="https://twitter.com/intent/tweet?text=${url}">
                <img src="/images/twitter.svg" width="20" height="20"/>
            </a>
          </div>
      </div>
    </div>
  `
  onload(view, init)
  return view

  function init() {
    const searchParams = new URLSearchParams(window.location.search)
    const wilsonId = searchParams.get('id')
    window.initRecaptcha = initRecaptcha

    window
      .fetch(`/wilsons/${wilsonId}`)
      .then(data => data.json())
      .then(data => {
        emit('my-wilson:loaded', data)
        addMetas()

        loadScript(
          `https://www.google.com/recaptcha/api.js?onload=initRecaptcha&render=explicit`
        )
      })
      .catch(err => console.log(err))
  }

  function initRecaptcha() {
    const el = document.querySelector('.g-recaptcha')

    grecaptcha.render(el.id, {
      sitekey: siteKey,
      callback: voteFor()
    })
  }

  function voteFor() {
    return () =>
      window
        .fetch('/vote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'g-recaptcha-response': document.getElementById(
              'g-recaptcha-response'
            ).value,
            uid: state.wilsons.uid
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.formSubmit) {
            emit('increment', uid)
          } else {
            const errorSpan = document.getElementsByClassName('error').item(0)
            errorSpan.classList.add('jelly')
          }
        })
  }

  function addMetas() {
    document.querySelector('meta[property="og:url"]').content =
      window.location.href
    document.querySelector('meta[property="og:image"]').content = `${window
      .location.hostname}/image/${state.myWilson.uid}.png`
  }
}
