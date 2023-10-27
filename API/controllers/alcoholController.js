const Alcohol = require('../models/alcoholModel');
const Review = require('../models/reviewModel');
const AlcoholReview = require('../models/alcoholReviewModel');
const ErrorHandler = require('../utilities/errorHandler');
const APIExtensions = require('./..//utilities/apiExtensions');
const catchAsync = require('./..//utilities/catchAsync');
const { createReview } = require('./reviewController');

exports.getAllAlcohols = catchAsync(async (req, res, next) => {
  const extensions = new APIExtensions(
    Alcohol.find().populate({
      path: 'alcoholReviews',
      select: 'review timestamp',
      populate: {
        path: 'review',
        select: 'rating comment',
      },
    }),
    req.query,
  )
    .filter()
    .sort()
    .fieldsLimit()
    .pagination();
  const alcohols = await extensions.query;

  res.status(200).json({
    alcohols,
  });
});

exports.getAlcohol = catchAsync(async (req, res, next) => {
  // const alcohol = await Alcohol.findById(req.params.id).populate({
  //     path: 'alcoholReviews',
  //     select: "review timestamp",
  //     populate: {
  //         path: 'review',
  //         select: 'rating comment',
  //     }
  // });
  const alcohol = await Alcohol.findById(req.params.id).populate({
    path: 'alcoholReviews',
    select: 'review timestamp',
    populate: {
      path: 'review',
      select: 'rating comment',
      populate: {
        path: 'user',
        select: '_id, name',
      },
    },
  });

  if (!alcohol) {
    return next(new ErrorHandler('No alcohol found with that ID', 404));
  }

  res.status(200).json(alcohol);
});

exports.createAlcohol = catchAsync(async (req, res, next) => {
  const newAlcohol = await Alcohol.create(req.body);

  res.status(201).json({ alcohol: newAlcohol });
});

exports.updateAlcohol = catchAsync(async (req, res, next) => {
  const alcohol = await Alcohol.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!alcohol) {
    return next(new ErrorHandler('No alcohol found with that ID', 404));
  }

  res.status(200).json(alcohol);
});

exports.deleteAlcohol = catchAsync(async (req, res, next) => {
  const alcoholReviews = await AlcoholReview.find({ alcohol: req.params.id });
  alcoholReviews.forEach(async (alcoholReview) => {
    await Review.findByIdAndRemove(alcoholReview.review);
    await AlcoholReview.findByIdAndRemove(alcoholReview._id);
  });

  const alcohol = await Alcohol.findByIdAndRemove(req.params.id);

  if (!alcohol) {
    return next(new ErrorHandler('No alcohol found with that ID', 404));
  }

  res.status(204).json();
});
