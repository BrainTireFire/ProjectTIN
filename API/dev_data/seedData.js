const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Alcohol = require('../models/alcoholModel');
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

//Import data
const importData = async () => {
    try {
        const createdAlcohols = await Alcohol.create(alcohols);
        const alcoholIds = createdAlcohols.map((alcohol) => alcohol._id);

        const createdReviews = await Review.create(reviews);
        const reviewIds = createdReviews.map((review) => review._id);

        for (const alcoholId of alcoholIds) {
            const randomReviewId = reviewIds[Math.floor(Math.random() * reviewIds.length)];

            const alcoholReview = new AlcoholReview({
                alcohol: alcoholId,
                review: randomReviewId,
                timestamp: new Date(),
            });

            await alcoholReview.save();
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
