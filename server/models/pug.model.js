const Sequelize = require('sequelize');
const db = require('./database');
const Coffee = require('./coffee.model');

const Pug = db.define('pugs', {
  // your code here

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  age: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },

  biography: {
    type: Sequelize.TEXT,
  },
});

Pug.prototype.isPuppy = function () {
  return this.age < 1;
};

Pug.prototype.shortBio = function () {
  const bio = this.biography.split(/\.|\?|!/)[0];
  return bio;
};

Pug.findByCoffee = async function (coffee) {
  const pugs = await Pug.findAll({
    // include refers to eager loading
    include: {
      model: Coffee,
      as: 'favoriteCoffee',
      where: { name: coffee },
    },
  });

  return pugs;
};

Pug.beforeValidate(pug => {
  pug.name = pug.name[0].toUpperCase() + pug.name.slice(1);
});

module.exports = Pug;
