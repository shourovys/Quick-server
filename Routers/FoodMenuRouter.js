const express = require('express');
const {
  addMenuItem,
  getThisMenuItem,
  updateMenuItem,
} = require('../Controllers/FoodMenuControllers');
const { businessAuth } = require('../Middleware/BusinessAuth');

const foodMenuRouter = express.Router();

foodMenuRouter.post('/add', businessAuth, addMenuItem);

foodMenuRouter.get('/get', businessAuth, getThisMenuItem);
module.exports = foodMenuRouter;
