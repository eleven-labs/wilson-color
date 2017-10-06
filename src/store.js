export default function initStore (app) {
  app.use(colorsStore)
}

function colorsStore (state, emitter) {
  state.selectedColor = '#FF00FF'
  emitter.on('color:change', function (color) {
    state.selectedColor = color
  })

  emitter.on('paint', function ({elementId, color}) {
    const wilson = document.getElementById('wilson').contentDocument
    const outline = wilson.getElementById(elementId)
    outline.style.fill = state.selectedColor
  })
}
