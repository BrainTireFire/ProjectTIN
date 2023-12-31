const Review = require('../models/reviewModel');
const Alcohol = require('../models/alcoholModel');
const AlcoholReview = require('../models/alcoholReviewModel');
const APIExtensions = require('./../utilities/apiExtensions');
const ErrorHandler = require('../utilities/errorHandler');
const catchAsync = require('./..//utilities/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const extensions = new APIExtensions(Review.find(), req.query)
    .filter()
    .sort()
    .fieldsLimit()
    .pagination();
  const reviews = await extensions.query;

  res.status(200).json({
    reviews,
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.findById(req.params.id);

  res.status(200).json(reviews);
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  const alcoholId = req.body.alcoholId;
  const alcohol = await Alcohol.findById(alcoholId);
  if (!alcohol) {
    return next(new ErrorHandler('No alcohol found with that ID', 404));
  }

  const reviewData = {
    alcohol: alcohol._id,
    review: newReview._id,
    timestamp: new Date(),
  };
  const alcoholReview = await AlcoholReview.create(reviewData);

  alcohol.alcoholReviews.push(alcoholReview._id);
  await alcohol.save();

  res.status(201).json({
    review: newReview,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    reviews,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const reviewId = req.params.id;
  const deletedReview = await Review.findByIdAndDelete(reviewId);

  if (!deletedReview) {
    return next(new ErrorHandler('Review not found', 404));
  }

  const alcoholReview = await AlcoholReview.findOne({ review: reviewId });
  if (alcoholReview) {
    const alcoholId = alcoholReview.alcohol;
    const alcohol = await Alcohol.findById(alcoholId);

    if (alcohol) {
      const index = alcohol.alcoholReviews.indexOf(alcoholReview._id);
      if (index !== -1) {
        alcohol.alcoholReviews.splice(index, 1);
        await alcohol.save();
      }
    }

    await AlcoholReview.findByIdAndDelete(alcoholReview._id);
  }

  res.status(204).end();
});
