export default function initStore (app) {
  app.use(colorsStore)
}

function colorsStore (state, emitter) {
  state.selectedColor = '#FF00FF'
  state.wilson = {}
  state.previousColors = []

  emitter.on('colorSelected', function (color) {
    state.selectedColor = color
    if (!state.previousColors.find(previousColor => previousColor === color)) state.previousColors.push(color)
    if (state.previousColors.length > 5) state.previousColors.splice(0, 1)
    emitter.emit('render')
  })

  emitter.on('paint', function ({elementId, color}) {
    const wilson = document.getElementById('wilson').contentDocument
    const outline = wilson.getElementById(elementId)
    outline.style.fill = state.selectedColor
    state.wilson[elementId] = color
  })
}
