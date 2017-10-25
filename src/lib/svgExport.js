const fs = require('fs')
const path = require('path')
const domino = require('domino')
const Zepto = require('zepto-node')
const canvg = require('canvg')
const Canvas = require('canvas')

function toPng (colors, filename) {
  const window = domino.createWindow()
  const $ = Zepto(window)
  fs.readFile(path.join(__dirname, '../../public/images/wilson-large.svg'), 'utf-8', (err, data) => {
    if (err) throw err
    const canvas = new Canvas()
    $('body').append(data)
    Object.keys(colors).forEach(id => {
      $(`#${id}`)[0].attributes.style.data = $(`#${id}`)[0].attributes.style.data.replace(/fill:(#[a-f0-9]{6}|none)/, `fill:${colors[id]}`)
    })
    canvg(canvas, $('body').html())
    const imageData = canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, '')
    fs.writeFile(`${path.join(__dirname, '../..', 'public', 'images', filename)}.png`, imageData, 'base64', err => {
      if (err) throw err
    })
  })
}

module.exports = {toPng}
