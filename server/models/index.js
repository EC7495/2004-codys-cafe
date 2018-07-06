const db = require('./database')
const Pug = require('./pug.model')
const Coffee = require('./coffee.model')

// VVV assign relations below VVV //
Pug.belongsTo(Coffee, {as: 'favoriteCoffee'})
Pug.belongsToMany(Pug, {as:'friends', through: 'pugFriends'})
//this association also pass the specs:
// Pug.hasMany(Pug, { as: 'friends'})


// ^^^ assign relations above ^^^ //

module.exports = {
  db,
  Pug,
  Coffee
}
