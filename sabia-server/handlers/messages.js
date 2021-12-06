const db = require('../models');

exports.createMessage = async function(req, res, next) {
    try {
        let user = await db.User.findOne({username: req.params.username});
        let message = await db.Message.create({
            text: req.body.text,
            user
        });

        user.messages.push(message.id);
        await user.save();

        let foundMessage = await db.Message.findById(message.id).populate('user', {
            username: true,
            profileImageUrl: true
        });

        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
};

exports.getMessage = async function(req, res, next) {
    try {
        let message = await db.Message.findById(req.params.id);
        if (message) {
            return res.status(200).json(message);
        }
        else {
            return next({
                status: 404,
                message: 'Not found'
            })
        }
    } catch (err) {
        return next(err);
    }
};

exports.deleteMessage = async function(req, res, next) {
    try {
        let message = await db.Message.findById(req.params.id);
        if (message) {
            console.log('hello from deleteMessage handlerrr')
            await message.remove();
            return res.status(204).send();
        } else {
            next({
                status: 404,
                message: 'Not found'
            })
        }
    } catch (err) {
        return next(err);
    }
};

