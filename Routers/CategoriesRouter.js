const express = require('express');
const { addCategories, getCategories } = require('../Controllers/CategoriesControllers');
const { businessAuth } = require('../Middleware/BusinessAuth');

const categoriesRouter = express.Router();

categoriesRouter.post('/add', businessAuth, addCategories);
categoriesRouter.get('/get', businessAuth, getCategories);
module.exports = categoriesRouter;
