import wilsonLib from './lib/wilson'

export default function initStore (app) {
  app.use(colorsStore)
}

function colorsStore (state, emitter) {
  state.selectedColor = '#FF00FF'
  state.wilson = {}
  state.previousColors = []

  emitter.on('colorSelected', function (color) {
    state.selectedColor = color
    emitter.emit('render')
  })

  emitter.on('paint', function ({elementId, color}) {
    wilsonLib.paint({elementId, color})
    state.wilson[elementId] = color
    if (!state.previousColors.find(previousColor => previousColor === color)) state.previousColors.push(color)
    if (state.previousColors.length > 5) state.previousColors.splice(0, 1)
    emitter.emit('render')
  })
}
