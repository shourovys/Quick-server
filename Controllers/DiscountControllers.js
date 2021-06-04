const Discount = require('../Models/DiscountModel');
const UserDiscount = require('../Models/UserDiscountModel');

const discountController = {};

discountController.addDiscount = async (req, res) => {
  try {
    console.log(req.body);
    await Discount.deleteOne({ businessId: req.businessId });
    const newDiscount = new Discount({
      ...req.body,
      businessId: req.businessId,
    });

    const saveDiscount = await newDiscount.save();

    return res.send(saveDiscount);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

discountController.getThisDiscount = async (req, res) => {
  const days = 6; // Days you want to subtract
  const date = new Date();
  const last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);

  const lastDay = `${last.getFullYear()}-${last.getMonth() + 1}-${last.getDate()}`;

  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;

  try {
    const thisDiscount = await UserDiscount.find(
      {
        businessId: req.businessId,
        createdAt: { $lt: new Date(today), $gt: new Date(lastDay) },
      },
      { createdAt: 1, amount: 1 },
    );
    console.log(
      '🚀 ~ file: DiscountControllers.js ~ line 41 ~ discountController.getThisDiscount= ~ thisDiscount',
      thisDiscount,
    );
    return res.send(thisDiscount);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
module.exports = discountController;
