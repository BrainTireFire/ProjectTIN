const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Alcohol = require('../models/alcoholModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const AlcoholReview = require('../models/alcoholReviewModel');

dotenv.config({ path: './config.env' });

const ConnectionString = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(ConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connect to the DB successful!");
});

//Read JSON FILES
const alcohols = JSON.parse(fs.readFileSync(`${__dirname}/alcohols.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

//Import data
const importData = async () => {
    try {
        const createdAlcohols = await Alcohol.create(alcohols);
        const alcoholIds = createdAlcohols.map((alcohol) => alcohol._id);

        const createdUsers = await User.create(users);
        const userIds = createdUsers.map((user) => user._id);

        const reviewsWithRandomUserIds = reviews.map((review) => {
            const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
            review.user = randomUserId;
            return review;
        });

        const createdReviews = await Review.create(reviewsWithRandomUserIds);
        const reviewIds = createdReviews.map((review) => review._id);


        for (const alcoholId of alcoholIds) {
            const randomReviewId = reviewIds[Math.floor(Math.random() * reviewIds.length)];

            const alcoholReview = new AlcoholReview({
                alcohol: alcoholId,
                review: randomReviewId,
                timestamp: new Date(),
                comment: 'testowy komentarz'
            });

            await alcoholReview.save();
        }


        for (const userId of userIds) {
            const reviewsObject = await Review.findOne({ user: userId });
            if (reviewsObject) {
                await User.updateOne({ _id: userId }, { $push: { reviews: reviewsObject._id } });
            }
        }

        for (const alcoholId of alcoholIds) {
            const alcoholReviewsObject = await AlcoholReview.findOne({ alcohol: alcoholId });
            if (alcoholReviewsObject) {
                await Alcohol.updateOne({ _id: alcoholId }, { $push: { alcoholReviews: alcoholReviewsObject._id } });
            }
        }

        console.log("Data successfully added!!!");
        process.exit();
    } catch (err) {
        console.log("ERROR: ", err);
    }
}

//Drop data from DB
const deleteData = async () => {
    try {
        await Alcohol.deleteMany();
        await Review.deleteMany();
        await AlcoholReview.deleteMany();
        await User.deleteMany();

        console.log("Data successfully deleted!!!");
        process.exit();
    } catch (err) {
        console.log("ERROR: ", err);
    }
}

if (process.argv[2] === '--import') {
    importData();
}
else if (process.argv[2] === '--delete') {
    deleteData();
}
