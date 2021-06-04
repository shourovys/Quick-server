const express = require('express');
const { createOrder, getOrder, updateOrder } = require('../Controllers/UserOrderControllers');
const { auth } = require('../Middleware/Auth');

const UserOrderRouter = express.Router();

UserOrderRouter.post('/create', auth, createOrder);
UserOrderRouter.post('/update', auth, updateOrder);
UserOrderRouter.get('/get', auth, getOrder);

module.exports = UserOrderRouter;
