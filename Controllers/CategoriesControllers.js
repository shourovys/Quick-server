const Categories = require('../Models/CategoriesModel');

const categoriesController = {};

categoriesController.addCategories = async (req, res) => {
  try {
    console.log(req.body);
    const newCategories = new Categories({
      ...req.body,
      businessId: req.businessId,
    });

    const saveCategories = await newCategories.save();
    return res.send(saveCategories);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
categoriesController.getCategories = async (req, res) => {
  try {
    const categories = await Categories.find({ businessId: req.businessId }, { name: 1, _id: 0 });
    const newCategories = {};
    categories.map((d) => {
      newCategories[d.name] = [];
      return null;
    });
    return res.send(newCategories);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
module.exports = categoriesController;
