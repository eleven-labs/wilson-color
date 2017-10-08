function getShapes (wilsonDocument) {
  const wilson = getWilsonDocument()
  const pathArray = Array.from(wilson.getElementsByTagName('path'))
  const ellipseArray = Array.from(wilson.getElementsByTagName('ellipse'))
  const circleArray = Array.from(wilson.getElementsByTagName('circle'))
  return [...pathArray, ...circleArray, ...ellipseArray]
}

function paint (elementId, color) {
  const wilson = getWilsonDocument()
  const outline = wilson.getElementById(elementId)
  outline.style.fill = color
}

function repaint (colorList) {
  const wilson = getWilsonDocument()
  Object.keys(colorList).forEach(key => {
    wilson.getElementById(key).style.fill = colorList[key]
  })
}

function getWilsonDocument () {
  return document.getElementById('wilson') && document.getElementById('wilson').contentDocument
}

export default {getShapes, paint, repaint}
