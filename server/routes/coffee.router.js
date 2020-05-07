const router = require('express').Router()
const {Coffee} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!

router.get("/", async (req, res, next) => {
  try {
    const coffees = await Coffee.findAll()
    res.send(coffees)
  } catch (err) {
    next(e)
  }
})

router.get("/ingredients/:ingredientName", async (req, res, next) => {
  try {
    const ingredientName = req.params.ingredientName
    const coffeeList = await Coffee.findByIngredient(ingredientName)

    res.json(coffeeList)

  } catch (err) {
    next(err)
  }
})

router.get("/:coffeeId", async (req, res, next) => {
  try {

    const coffeeId = req.params.coffeeId

    const data = await Coffee.findById(coffeeId)

    if(!data) {
      throw new Error("Not found")
      //res.sendStatus(404)
    } else {
      res.send(data)
    }

  } catch (err) {
    err.status = 404
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    //console.log("req.body", req.body)
    const newCoffee = {
      name: req.body.name,
      ingredients: req.body.ingredients || []
    }

    let coffee = await Coffee.create(newCoffee)
    //console.log("!!!", coffee)
    res.status(201).send(coffee)

  } catch (error) {
    next(error)
  }
})

module.exports = router
