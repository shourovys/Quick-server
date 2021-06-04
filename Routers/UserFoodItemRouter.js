const express = require('express');
const { getThisResFoods, getThisResDiscount } = require('../Controllers/UserFoodItemControllers');
// const { businessAuth } = require('../Middleware/BusinessAuth');
const { auth } = require('../Middleware/Auth');

const UserFoodItemRouter = express.Router();

UserFoodItemRouter.get('/ThisResFoods/:ResId', getThisResFoods);
UserFoodItemRouter.get('/ThisResDiscount/:ResId', auth, getThisResDiscount);

module.exports = UserFoodItemRouter;
