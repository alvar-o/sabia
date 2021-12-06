const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

async function hashPassword(next) {
    try {
        if (!this.isModified('password')) return next();

        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }
    catch (err) {
        next(err);
    }
}

async function comparePassword(candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
}

userSchema.pre('save', hashPassword);

userSchema.methods.comparePassword = comparePassword;

const User = mongoose.model('User', userSchema);

module.exports = User;