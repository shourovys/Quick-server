const express = require('express');
const {
  getOrders,
  updateOrder,
  updateOrderState,
  dashboardData,
} = require('../Controllers/OrderControllers');
const { businessAuth } = require('../Middleware/BusinessAuth');

const OrderRouter = express.Router();

OrderRouter.get('/get', businessAuth, getOrders);
OrderRouter.post('/update', businessAuth, updateOrder);
OrderRouter.get('/update/state', businessAuth, updateOrderState);
OrderRouter.get('/dashboard/get', businessAuth, dashboardData);

module.exports = OrderRouter;
