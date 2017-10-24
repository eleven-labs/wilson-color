var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const ReCAPTCHA = require('recaptcha2')
const recaptchaConfig = require('./config').recaptcha
const database = require('./src/lib/database')
const svgExport = require('./src/lib/svgExport')

const recaptcha = new ReCAPTCHA(recaptchaConfig)

var app = express()

app.set('view engine', 'html')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'public')))
app.post('/save', function (req, res) {
  recaptcha.validateRequest(req).then(() => {
    database.insertWilson(req.body.name, req.body.wilsonData, req.body.email, (result) => {
      res.json({formSubmit: true})
      svgExport.toPng(req.body.wilsonData, result.ops[0].uid)
    })
  }).catch(errorCodes => {
    res.json({formSubmit: false, errors: recaptcha.translateErrors(errorCodes)})
  })
})

app.get('/wilsons', database.getWilsons)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

if(process.env.NODE_ENV === 'prod') {
  app.listen(80)
}
else {
  app.listen(3000)
}

module.exports = app
