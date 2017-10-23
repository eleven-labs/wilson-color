const fetch = require('isomorphic-fetch')

myHeaders = new Headers({
  Authorization:
    'Bearer AAAAAAAAAAAAAAAAAAAAAAFl2wAAAAAAA8bmcr73w4FGci%2Fwoa6eeVE8BEM%3DbyyL04gEK2j3OSZIDjumg6swNK4wYe2YHjOwwQNflksmcaC4h9'
})
module.exports = {
  getWilsons: function(req, res) {
    fetch(
      `https://api.twitter.com/1.1/search/tweets.json?q=%23angular&result_type=recent${req
        .query.maxId
        ? `&max_id=${req.query.maxId}`
        : ''}`,
      { headers: myHeaders }
    )
      .then(response => response.json())
      .then(({ statuses }) =>
        res.json({
          wilsons: statuses
            .filter(({ entities }) => entities.media)
            .map(({ id_str, favorite_count, entities, user }) => ({
              id: id_str,
              favorite_count,
              media: entities.media[0].media_url,
              screen_name: user.screen_name
            }))
        })
      )
      .catch(error => res.json({ error: error.message }))
  }
}
