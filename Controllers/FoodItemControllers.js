const FoodItem = require('../Models/FoodItemModel');

const foodItemController = {};

foodItemController.addFoodItem = async (req, res) => {
  try {
    const newFoodItem = new FoodItem({
      ...req.body,
      businessId: req.businessId,
    });

    const saveFoodItem = await newFoodItem.save();
    return res.send(saveFoodItem);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
foodItemController.updateFoodItem = async (req, res) => {
  try {
    const updated = await FoodItem.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    console.log(
      '🚀 ~ file: FoodItemControllers.js ~ line 24 ~ foodItemController.updateFoodItem= ~ updated',
      updated,
    );
    return res.send(updated);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

foodItemController.getThisCategoriesFoods = async (req, res) => {
  try {
    const { CategoriesName } = req.params;

    const thisCategoriesFoods = await FoodItem.find({
      categories: CategoriesName,
      businessId: req.businessId,
    });
    return res.send(thisCategoriesFoods);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
module.exports = foodItemController;

// const getCircularReplacer = () => {
//   const seen = new WeakSet();
//   return (key, value) => {
//     if (typeof value === 'object' && value !== null) {
//       if (seen.has(value)) {
//         return;
//       }
//       seen.add(value);
//     }
//     return value;
//   };
// };
// const jsonData = JSON.stringify(thisCategoriesFoods, getCircularReplacer());
