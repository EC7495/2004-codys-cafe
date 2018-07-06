const router = require('express').Router()
const {Coffee} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!
router.get('/', async (req, res, next) =>{
  try{
    const coffees = await Coffee.findAll()
    res.json(coffees)
  }catch (err){
    next(err)
  }
})

router.get('/ingredients/:ingredientName', async(req, res, next) =>{
  try{
    const ingredient = req.params.ingredientName;
    const coffeeByIng = await Coffee.findByIngredient(ingredient)
    res.json(coffeeByIng)
  } catch(err){
    next(err)
  }
})

router.get('/:coffeeId', async(req, res, next) =>{
  try{
    const id = req.params.coffeeId
    const coffee = await Coffee.findById(id)
    if(coffee){
      res.json(coffee)
    }else{
      res.sendStatus(404)
    }
  } catch(err){
    next(err)
  }
})

router.post('/', async(req,res,next) => {
  try{
    const newCoffee = req.body;
    const createNewCoffee = await Coffee.create(newCoffee)
    res.status(201).json(createNewCoffee)
  } catch(err){
    next(err)
  }
})


module.exports = router
