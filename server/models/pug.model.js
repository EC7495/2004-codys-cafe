const Sequelize = require('sequelize')
const db = require('./database')
const Coffee = require('./coffee.model')

const Pug = db.define('pugs', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  biography:{
    type: Sequelize.TEXT
  }
}
,{
    hooks: {
      beforeSave: (pug)=>{
        pug.name = pug.name.charAt(0).toUpperCase() + pug.name.substr(1)
      }
    }
  }
)

Pug.prototype.isPuppy = function(){
  return this.age < 1
}


Pug.prototype.shortBio = function(){
  let endings = ['.', '!', '?']
  let smallerIndex = endings.reduce((smaller,char) => {
    let index = this.biography.indexOf(char);
    if(index < smaller && index !== -1){
      return index
    }else{
      return smaller
    }
  },this.biography.length)

  return this.biography.substr(0,smallerIndex)
}

Pug.findByCoffee = function(coffee){
  const puggies = this
  .findAll({
    include:[{
      // model: Coffee,
      association:'favoriteCoffee',
      where: {name: coffee}}]
  })
  return puggies
}


module.exports = Pug
