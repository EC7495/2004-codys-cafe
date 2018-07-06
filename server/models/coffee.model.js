const { Sequelize , Op } = require('sequelize')
const db = require('./database')

const Coffee = db.define('coffee', {
  name:{
    type: Sequelize.STRING,
    allowNull: false
  },
  ingredients: Sequelize.ARRAY(Sequelize.STRING)
},
  {hooks: {
    beforeSave: (coffee) => {
      if(coffee.ingredients && !coffee.ingredients.includes('love')){
        coffee.ingredients.push('love')
      }

    }
  }
}
)

Coffee.prototype.getIngredients = function(){
  return this.ingredients.join(', ')
}

Coffee.findByIngredient = function(ingredient){
  return this.findAll({
    where:{
      ingredients: {
        [Op.contains]: [ingredient]
      }
    }
  })
}

module.exports = Coffee
