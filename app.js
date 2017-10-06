var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express()

app.set('view engine', 'html')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(3000)

module.exports = app
