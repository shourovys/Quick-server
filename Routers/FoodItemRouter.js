const express = require('express');
const {
  addFoodItem,
  getThisCategoriesFoods,
  updateFoodItem,
} = require('../Controllers/FoodItemControllers');
const { businessAuth } = require('../Middleware/BusinessAuth');

const foodItemRouter = express.Router();

foodItemRouter.post('/add', businessAuth, addFoodItem);

foodItemRouter.post('/update', businessAuth, updateFoodItem);

foodItemRouter.get('/CategoriesFood/:CategoriesName', businessAuth, getThisCategoriesFoods);

module.exports = foodItemRouter;
