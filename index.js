const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const businessAuthRouter = require('./Routers/AuthBusinessRouter');
const authRouter = require('./Routers/AuthRouter');
const categoriesRouter = require('./Routers/CategoriesRouter');
const discountRouter = require('./Routers/DiscountRouter');
const foodItemRouter = require('./Routers/FoodItemRouter');
const foodMenuRouter = require('./Routers/FoodMenuRouter');
const OrderRouter = require('./Routers/OrderRouter');
const reviewRouter = require('./Routers/ReviewRouter');
const UserFoodItemRouter = require('./Routers/UserFoodItemRouter');
const UserOrderRouter = require('./Routers/UserOrderRouter');

require('dotenv').config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/user/auth', authRouter);
app.use('/business/auth', businessAuthRouter);
app.use('/business/foodItem', foodItemRouter);
app.use('/user/foodItem', UserFoodItemRouter); // getThisResDiscount get form here
app.use('/user/order', UserOrderRouter);
app.use('/user/review', reviewRouter);
app.use('/business/order', OrderRouter); // dashboardData get form here
app.use('/business/discount', discountRouter);
app.use('/business/menu', foodMenuRouter);
app.use('/business/categories', categoriesRouter);

app.get('/', (req, res) => res.send('welcome to Quick Menu'));

const CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
const PORT = process.env.PORT || 4000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)),
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
