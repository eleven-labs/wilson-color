import onload from 'on-load'
import loadScript from 'load-script'
import wilsonThumbnail from './wilsonThumbnail'
const html = require('choo/html')

const siteKey = '6Lc57TQUAAAAAPhRKtmHlNI0MWtGwDY5inl-upQ6'

export default function gallery(state, emit) {
  const wilsonList = state.wilsons.map(wilson => {
    return wilsonThumbnail(wilson, emit)
  })
  const view = html`
    <div class="gallery">
      <div class="error"/>
      ${wilsonList}
    </div>
  `
  onload(view, init)
  return view

  function init() {
    window.fetch('/wilsons').then(data => data.json()).then(data => {
      emit('wilsons:loaded', data)

      loadScript(
        'https://www.google.com/recaptcha/api.js?onload=initRecaptcha&render=explicit'
      )
    })
    window.initRecaptcha = initRecaptcha
  }

  function initRecaptcha() {
    document.querySelectorAll('.g-recaptcha').forEach((el, index) => {
      grecaptcha.render(el.id, {
        sitekey: siteKey,
        callback: voteFor(el.id, index)
      })
    })
  }

  function voteFor(uid, index) {
    return () => {
      window
        .fetch('/vote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'g-recaptcha-response': document.getElementById(
              index === 0
                ? 'g-recaptcha-response'
                : `g-recaptcha-response-${index}`
            ).value,
            uid: uid
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
  }
}
