const express = require('express');

const { businessAuth } = require('../Middleware/BusinessAuth');
const { auth } = require('../Middleware/Auth');
const { updateReview } = require('../Controllers/ReviewControllers');

const reviewRouter = express.Router();

// reviewRouter.get('/get', auth, getOrders);
reviewRouter.post('/update', auth, updateReview);
// reviewRouter.get('/update/state', businessAuth, updateOrderState);
// reviewRouter.get('/dashboard/get', businessAuth, dashboardData);

module.exports = reviewRouter;
