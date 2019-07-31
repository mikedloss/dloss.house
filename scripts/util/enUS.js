const removeENUS = (game) => {
  Object.keys(game.fields).forEach(k => {
    game['fields'][k] = game['fields'][k]['en-US']
  })
  return game;
}

const addENUS = (game) => {
  Object.keys(game.fields).forEach(k => {
    game['fields'][k] = {
      'en-US': game['fields'][k]
    }
  })
  return game;
}

module.exports = {
  remove: removeENUS,
  add: addENUS,
}