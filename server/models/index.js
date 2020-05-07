const db = require('./database');
const Pug = require('./pug.model');
const Coffee = require('./coffee.model');

// VVV assign relations below VVV //

//hasMany => foreign key on target
//belongsTo => foreign key on source

//many to many => belongstomany

Pug.belongsTo(Coffee, { as: 'favoriteCoffee' });
Coffee.hasMany(Pug);
Pug.belongsToMany(Pug, { as: 'friends', through: 'pugId' });
// ^^^ assign relations above ^^^ //

module.exports = {
  db,
  Pug,
  Coffee,
};
