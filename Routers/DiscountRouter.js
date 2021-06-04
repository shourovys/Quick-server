const express = require('express');
const { addDiscount, getThisDiscount } = require('../Controllers/DiscountControllers');
const { businessAuth } = require('../Middleware/BusinessAuth');

const discountRouter = express.Router();

discountRouter.post('/add', businessAuth, addDiscount);

discountRouter.get('/get', businessAuth, getThisDiscount);

module.exports = discountRouter;
