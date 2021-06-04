const FoodItem = require('../Models/FoodItemModel');
const Review = require('../Models/ReviewModel');
const UserOrders = require('../Models/UserOrderModel');

const reviewController = {};
reviewController.updateReview = async (req, res) => {
  try {
    const { userId } = req;
    console.log(
      '🚀 ~ file: ReviewControllers.js ~ line 9 ~ reviewController.updateReview= ~ userId',
      req.body.foodRatings,
    );
    req.body.foodRatings.map(async (review) => {
      const { menuId, rating } = review;
      const foodId = menuId.split('_')[0];

      const isPresent = await Review.findOne({
        userId,
        menuId,
      });

      const savedFoodItem = await FoodItem.findOne({
        _id: foodId,
      });
      console.log(
        '🚀 ~ file: ReviewControllers.js ~ line 20 ~ req.body.map ~ savedFoodItem',
        isPresent.rating,
      );

      if (isPresent) {
        if (isPresent.rating !== rating) {
          try {
            let newRating;
            if (Number(savedFoodItem.totalRating) > Number(isPresent.rating)) {
              newRating =
                Number(savedFoodItem.totalRating) - Number(isPresent.rating) + Number(rating);
            } else {
              newRating =
                Number(isPresent.rating) - Number(savedFoodItem.totalRating) + Number(rating);
            }

            // const updatedFoodItem =
            await FoodItem.findByIdAndUpdate(
              foodId,
              {
                totalRating: newRating,
              },
              {
                new: true,
              }
            );

            // const update =
            await Review.findOneAndUpdate(
              {
                userId,
                menuId,
              },
              {
                rating,
              },
              { new: true }
            );
          } catch (error) {
            console.log('🚀 ~ file: ReviewControllers.js ~ line 57 ~ req.body.map ~ error', error);
          }
        }
      } else {
        try {
          // const updatedFoodItem =
          await FoodItem.findByIdAndUpdate(
            foodId,
            {
              totalRating: Number(savedFoodItem.totalRating) + Number(rating),
              totalReview: Number(savedFoodItem.totalReview) + 1,
            },
            {
              new: true,
            }
          );

          const newReview = new Review({
            userId,
            menuId,
            foodId,
            rating,
          });

          // const saveReview =
          await newReview.save();
        } catch (error) {
          console.log('🚀 ~ file: ReviewControllers.js ~ line 88 ~ req.body.map ~ error', error);
        }
      }
    });
    const updateOrder = await UserOrders.findOneAndUpdate(
      { _id: req.body.orderId },
      { reviewTake: true },
      { new: true }
    );
    return res.send({ currentOrder: updateOrder });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = reviewController;
