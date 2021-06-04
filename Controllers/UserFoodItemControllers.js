const Categories = require('../Models/CategoriesModel');
const FoodItem = require('../Models/FoodItemModel');
const UserDiscount = require('../Models/UserDiscountModel');

const UserFoodItemController = {};

UserFoodItemController.getThisResFoods = async (req, res) => {
  try {
    const { ResId } = req.params;

    const thisResFoods = await FoodItem.find({
      businessId: ResId,
    });

    const thisResCategories = await Categories.find({
      businessId: ResId,
    });

    return res.send({
      resId: ResId,
      foodItems: thisResFoods,
      categories: thisResCategories,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

UserFoodItemController.getThisResDiscount = async (req, res) => {
  try {
    const { userId } = req;
    const { ResId } = req.params;
    const days = 31; // Days you want to subtract
    const date = new Date();
    const last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);

    const lastDay = `${last.getFullYear()}-${last.getMonth() + 1}-${last.getDate()}`;

    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
    const thisResDiscount = await UserDiscount.findOne({
      businessId: ResId,
      userId,
      createdAt: { $lt: new Date(today), $gt: new Date(lastDay) },
    }).sort({ _id: -1 });
    console.log(
      '🚀 ~ file: UserFoodItemControllers.js ~ line 47 ~ UserFoodItemController.getThisResDiscount= ~ thisResDiscount',
      thisResDiscount,
    );

    return res.send(thisResDiscount);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
module.exports = UserFoodItemController;
