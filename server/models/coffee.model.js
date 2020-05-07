const Sequelize = require('sequelize');
const db = require('./database');
const { Op } = require('sequelize');

const Coffee = db.define('coffee', {
  // your code here
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

Coffee.prototype.getIngredients = function () {
  return this.ingredients.join(', ');
};

Coffee.findByIngredient = async function (ingredient) {
  return await Coffee.findAll({
    where: {
      ingredients: {
        [Op.contains]: [ingredient],
      },
    },
  });
};

Coffee.beforeValidate(element => {
  if (!element.ingredients.includes('love')) element.ingredients.push('love');
});

module.exports = Coffee;
