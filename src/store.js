import wilsonLib from './lib/wilson'

export default function initStore(app) {
  app.use(colorsStore)
  app.use(savingStore)
  app.use(wilsonsStore)
  app.use(countVoteStore)
}

function wilsonsStore(state, emitter) {
  state.wilsons = []

  emitter.on('wilsons:loaded', data => {
    state.wilsons = data
    emitter.emit('render')
  })
}

function colorsStore(state, emitter) {
  state.selectedColor = '#FF00FF'
  state.wilson = {}
  state.previousColors = []

  emitter.on('colorSelected', function(color) {
    state.selectedColor = color
    emitter.emit('render')
  })

  emitter.on('paint', function({ elementId, color }) {
    wilsonLib.paint(elementId, color)
    state.wilson[elementId] = color
    if (!state.previousColors.find(previousColor => previousColor === color))
      state.previousColors.push(color)
    if (state.previousColors.length > 5) state.previousColors.splice(0, 1)
    emitter.emit('render')
  })
}

function savingStore(state, emitter) {
  state.saving = {
    isSaving: false,
    isOnError: false
  }

  emitter.on('save:visible', function(isVisible) {
    state.saving.isSaving = isVisible
    emitter.emit('render')
  })

  emitter.on('save:error', function(isOnError) {
    state.saving.isOnError = isOnError
    emitter.emit('render')
  })
}

function countVoteStore(state, emitter) {
  emitter.on('increment', function(id) {
    state.wilsons.find(({ uid }) => uid === id).vote += 1
    emitter.emit('render')
  })
}
