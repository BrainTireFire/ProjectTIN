const mongoose = require('mongoose');

const alcoholSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "An alcohol must have a name"],
        unique: true,
        trim: true,
        maxlength: [50, 'An alcohol name must have less then 50 characters'],
        minlength: [3, 'An alcohol name must have more then 3 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [800, 'An alcohol description must have less then 800 characters'],
    },
    type: {
        type: String,
        required: true,
        enum: {
            values: ["Whiskey", "Vodka", "Rum", "Gin", "Tequila", "Brandy", "Wine", "Beer", "Cider", "Sake"],
            message: 'Accessible types are: Whiskey, Vodka, Rum, Gin, Tequila, Brandy, Wine, Beer, Cider, Sake'
        }
    },
    age: {
        type: Number,
        max: [170, 'Age must be less or equal  170'],
        min: [0, 'Age must be above or equal 0']
    },
    alcohol_percentage: {
        type: Number,
        required: [true, "An alcohol must have a percentage"],
        max: [99, 'Rating must be less or equal 99'],
        min: [1, 'Rating must be above or equal 1.0']
    },
    price: {
        type: Number,
        required: [true, "An alcohol must have a price"]
    },
    alcoholReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AlcoholReview'
    }],
});

const Alcohol = mongoose.model('Alcohol', alcoholSchema);

module.exports = Alcohol;
