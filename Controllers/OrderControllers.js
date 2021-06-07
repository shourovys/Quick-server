const Discount = require('../Models/DiscountModel');
const UserDiscount = require('../Models/UserDiscountModel');
const UserOrders = require('../Models/UserOrderModel');

const OrderController = {};
OrderController.getOrders = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 12;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await UserOrders.countDocuments({});
    const posts = await UserOrders.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getRandomNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
OrderController.updateOrder = async (req, res) => {
  const { orderId, userId, total, status } = req.body;

  const { businessId } = req;

  try {
    let saveUserDiscount;
    if (status === 'Payment Done') {
      const discountInfoArray = await Discount.find({ businessId });
      const discountInfo = discountInfoArray[0];
      const days = 30; // Days you want to subtract
      const date = new Date();
      const last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);

      const lastDay = `${last.getFullYear()}-${last.getMonth() + 1}-${last.getDate()}`;

      const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;

      const isGetDiscountToday = await UserDiscount.find({
        userId,
        created: { $gte: today },
      });
      // const totalDiscountToday = await UserDiscount.find({
      //   businessId,
      //   created: { $gte: today },
      // });

      // const thisResDiscount = await UserDiscount.find({
      //   businessId: ResId,
      //   userId,
      //   createdAt: { $lt: new Date(today), $gt: new Date(lastDay) },
      // });

      if (discountInfo.start <= total && isGetDiscountToday.length < 1) {
        const isNumGet = getRandomNumberBetween(10, 20);
        if (isNumGet > 10) {
          const discountAmount = Math.floor((total * discountInfo.percent) / 100);
          const newUserDiscount = new UserDiscount({
            userId,
            businessId,
            orderId,
            amount: discountAmount,
            remain: discountAmount,
          });

          saveUserDiscount = await newUserDiscount.save();
          console.log(
            '🚀 ~ file: OrderControllers.js ~ line 62 ~ OrderController.updateOrder= ~ saveUserDiscount',
            saveUserDiscount,
          );
        }
      }
    }

    const updated = await UserOrders.findByIdAndUpdate(
      orderId,
      {
        status,
      },
      { new: true }
    );
    return res.send({
      updated,
      saveUserDiscount,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

OrderController.updateOrderState = async (req, res) => {
  const { orderId } = req.query;
  console.log(
    '🚀 ~ file: OrderControllers.js ~ line 54 ~ OrderController.updateOrderState= ~ orderId',
    orderId
  );
  try {
    const updated = await UserOrders.findByIdAndUpdate(
      orderId,
      {
        orderType: 'open',
      },
      { new: true },
    );
    return res.send({
      updated,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

OrderController.dashboardData = async (req, res) => {
  const days = 9; // Days you want to subtract
  const date = new Date();
  const last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);

  const lastDay = `${last.getFullYear()}-${last.getMonth() + 1}-${last.getDate()}`;

  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;

  try {
    const orderData = await UserOrders.find(
      {
        // resId: req.businessId,
        resId: '6022aff5d8047005c081301b',
        status: 'Payment Done',
        createdAt: { $lt: new Date(today), $gt: new Date(lastDay) },
      },
      { createdAt: 1, totalPrice: 1, ordersItems: 1 }
    );

    return res.send(orderData);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
module.exports = OrderController;
