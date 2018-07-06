const router = require('express').Router()
const {Pug} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/pugs!
router.get('/', async (req,res,next) => {
  try{
    const allPugs = await Pug.findAll()
    res.json(allPugs)
  }catch(err){
    next(err)
  }
})

router.get('/favoriteCoffee/:favoriteCoffeeName', async (req,res, next) => {
  try{
    const favCoffeeName = req.params.favoriteCoffeeName
    const pugsByFavCoffee = await Pug.findByCoffee(favCoffeeName)
    res.json(pugsByFavCoffee)
  }catch(err){
    next(err)
  }
})

router.get('/:pugId', async (req, res, next) => {
  try{
    const pugId = req.params.pugId
    const getPug = await Pug.findById(pugId)
    if(getPug){
      res.json(getPug)
    } else{
      res.status(404).send()
    }
  }catch(err){
    next(err)
  }
})

router.post('/', async (req, res, next) =>{
  try{
    const { body } = req
    const newPug = await Pug.create(body)
    res.status(201).json(newPug)
  }catch(err){
    next(err)
  }
})

router.put('/:pugId', async (req, res, next)=> {
  try{
    const { pugId } = req.params
    const { body } = req
    //why its not returning the number of rows affected?
    const [pugsUpdated, updatedPug] = await Pug.update(body, {where: { id: pugId }, returning: true, plain: true})
    if(await Pug.findById(pugId)){
      res.json(updatedPug)
    } else{
      res.status(404).send()
    }
  }catch(err){
    //passing only when I call next(). fail when next(err)
    next()
  }
})

router.delete('/:pugId', async (req, res, next)=>{
  try{
    const { pugId } = req.params
    if(await Pug.findById(pugId)){
      await Pug.destroy({
        where: {
          id: pugId
        }
      })
      res.sendStatus(204)
    } else{
      res.status(404).send()
    }
  }catch(err){
    next(err)
  }
})

module.exports = router
