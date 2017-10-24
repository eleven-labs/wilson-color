const uid = require('uid')
const MongoClient = require('mongodb').MongoClient

module.exports = {
  getWilsons: function(req, res) {
    connect(db => {
      var collection = db.collection('wilsons')
      collection.find({}).toArray((err, docs) => {
        if (err) throw err
        res.json(
          docs.map(doc => {
            delete doc._id
            delete doc.email
            return doc
          })
        )
      })
    })
  },

  getWilson: function(req, res) {
    connect(db => {
      var collection = db.collection('wilsons')
      var uid = req.params.id

      collection.findOne({ uid }, (err, doc) => {
        if (err) {
          throw err
        } else if (doc) {
          delete doc._id
          delete doc.email
          res.json(doc)
        } else {
          res.status(404).json({ error: 'user not found' })
        }
      })
    })
  },

  insertWilson: function(name, colors, email, cb) {
    connect(db => {
      var collection = db.collection('wilsons')
      collection.insertMany(
        [
          {
            uid: uid(10),
            name,
            email,
            colors
          }
        ],
        function(err, result) {
          if (err) throw err
          cb(result)
        }
      )
    })
  }
}

function connect(cb) {
  MongoClient.connect('mongodb://localhost:27017/wilson-color', function(
    err,
    db
  ) {
    if (err) throw new Error('mongodb connection failed')
    cb(db)
  })
}
