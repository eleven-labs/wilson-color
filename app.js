var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const ReCAPTCHA = require('recaptcha2')

const recaptcha = new ReCAPTCHA({
  siteKey: 'todo',
  secretKey: 'todo'
})

var app = express()

app.set('view engine', 'html')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'public')))
app.post('/save', function (req, res) {
  recaptcha.validateRequest(req)
  .then(() => {
    res.json({formSubmit: true})
  })
  .catch(errorCodes => {
    res.json({formSubmit: false, errors: recaptcha.translateErrors(errorCodes)})
  })
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(3000)

module.exports = app
