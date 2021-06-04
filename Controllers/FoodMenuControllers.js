const FoodMenu = require('../Models/FoodMenuModel');

const foodMenuController = {};

foodMenuController.addMenuItem = async (req, res) => {
  try {
    console.log(req.body);
    await FoodMenu.deleteOne({ businessId: req.businessId });
    const newFoodMenu = new FoodMenu({
      foodMenu: req.body,
      businessId: req.businessId,
    });

    const saveFoodItem = await newFoodMenu.save();

    return res.send(saveFoodItem);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

foodMenuController.getThisMenuItem = async (req, res) => {
  try {
    const thisMenuItem = await FoodMenu.find({ businessId: req.businessId });
    return res.send(thisMenuItem);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = foodMenuController;
