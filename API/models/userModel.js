const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [100, 'A user name must have less then 50 characters'],
        minlength: [3, 'A user name must have more then 4 characters']
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'moderator', 'admin', 'alcoholic'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [8, 'A user password must have more then 4 characters'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [8, 'A user password must have more then 4 characters'],
        validate: {
            validator: function (el) {
                //ONLY WORKS ON SAVE AND CREATE!
                return el === this.password;
            },
            message: 'Password are not the same'
        },
        select: false
    },
    passwordChangedAt: {
        type: Date,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre('find', function (next) {
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.correctPassword = async function (passwordToCheck, userPassword) {
    return await bcrypt.compare(passwordToCheck, userPassword);
};

userSchema.methods.changesPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
