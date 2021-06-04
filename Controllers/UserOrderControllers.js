const mongoose = require('mongoose');

const Categories = require('../Models/CategoriesModel');
const FoodItem = require('../Models/FoodItemModel');
const UserDiscount = require('../Models/UserDiscountModel');
const UserOrders = require('../Models/UserOrderModel');

const UserOrderController = {};

UserOrderController.createOrder = async (req, res) => {
  console.log(
    '🚀 ~ file: UserOrderControllers.js ~ line 14 ~ UserOrderController.createOrder= ~ req.body.discountId',
    req.body.discountId,
  );
  try {
    const { userId } = req;
    if (mongoose.Types.ObjectId.isValid(req.body.discountId)) {
      const discount = await UserDiscount.findById(req.body.discountId);
      console.log(
        '🚀 ~ file: UserOrderControllers.js ~ line 15 ~ UserOrderController.createOrder= ~ discount',
        discount
      );

      let applyAbleDiscount = 0;
      if (discount.remain > 0) {
        if (discount.remain > 40) {
          applyAbleDiscount = 40;
        } else {
          applyAbleDiscount = discount.remain;
        }
      }
      const newOrder = new UserOrders({
        ordersItems: req.body.ordersItems,
        resId: req.body.resId,
        userId,
        tableNo: 2,
        status: 'panging',
        totalPrice: req.body.totalPrice,
        discount: applyAbleDiscount,
      });

      const saveOrder = await newOrder.save();
      console.log(
        '🚀 ~ file: UserOrderControllers.js ~ line 18 ~ UserOrderController.createOrder= ~ saveOrder',
        saveOrder
      );

      return res.send({
        currentOrder: saveOrder,
      });
    }
    const newOrder = new UserOrders({
      ordersItems: req.body.ordersItems,
      resId: req.body.resId,
      userId,
      tableNo: 2,
      status: 'panging',
      totalPrice: req.body.totalPrice,
    });

    const saveOrder = await newOrder.save();
    console.log(
      '🚀 ~ file: UserOrderControllers.js ~ line 18 ~ UserOrderController.createOrder= ~ saveOrder',
      saveOrder
    );

    return res.send({
      currentOrder: saveOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

UserOrderController.updateOrder = async (req, res) => {
  console.log(
    '🚀 ~ file: UserOrderControllers.js ~ line 53 ~ UserOrderController.updateOrder= ~ req.body.ordersItems',
    req.body.ordersItems,
  );

  try {
    const saveOrder = await UserOrders.findOneAndUpdate(
      { _id: req.body.orderId },
      {
        ordersItems: req.body.ordersItems,
        orderType: 'modified',
        totalPrice: req.body.totalPrice,
      },
      { new: true },
    );
    console.log(
      '🚀 ~ file: UserOrderControllers.js ~ line 41 ~ UserOrderController.updateOrder= ~ saveOrder',
      saveOrder,
    );

    return res.send({
      currentOrder: saveOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

UserOrderController.getOrder = async (req, res) => {
  const { userId } = req;
  try {
    const currentOrder = await UserOrders.findOne({ userId }, {}, { sort: { createdAt: -1 } });
    return res.send(currentOrder);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
module.exports = UserOrderController;
