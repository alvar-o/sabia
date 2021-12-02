const mongoose = require('mongoose'),
      User = require('./user');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

messageSchema.pre('remove', async function(next) {
    try {
        console.log('hello from pre')
        let user = await User.findById(this.user);
        // console.log('pre deleteOne. user:', user);
        user.messages.remove(this.id);

        await user.save();

        return next();
    } catch(err) {
        return next(err);
    }
})

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;