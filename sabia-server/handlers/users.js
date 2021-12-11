const db = require('../models');

exports.getUser = async function (req, res, next) {
    try {
        const user = await db.User.findOne({ username: req.params.username })
            .populate({
                path: 'messages',
                options: {
                    sort: {
                        createdAt: 'desc'
                    }
                },
                populate : {
                    path: 'user'
                }
            });
        const { username, email, profileImageUrl, messages } = user;
        res.status(200).json({ username, email, profileImageUrl, messages });
    } catch (err) {
        return next(err);
    }
}

exports.updateUser = async function (req, res, next) {
    try {
        const user = await db.User.findOneAndUpdate(
            { username: req.params.username },
            req.body,
            { new: true });
        const { username, email, profileImageUrl } = user;
        res.status(200).json({ username, email, profileImageUrl })
        
    } catch (err) {
        return next(err);
    }
}