// require('dotenv').load();
const db = require('../models')
const jwt = require('jsonwebtoken');

// make sure user has logged in == Authentication
exports.loginRequired = function(req, res, next) {
    try {
        const token = req.headers.authorization // Bearer space blablablah
            .split(' ')[1]
        
        jwt.verify(token, process.env.SECRET_KEY,
            (err, payload) => {
                // if there is a payload, that's enough for now
                // it means we found the token
                if (payload) {
                    return next();
                }
                else {
                    return next({
                        status: 401,
                        message: 'Please log in first!'
                    })
                }
            })
    } catch (err) {
        return next({
            status: 401,
            message: 'Please log in first!'
        })
    }
};

// make sure we get the correct user == Authorization
exports.ensureCorrectUser = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY,
            async (err, payload) => {
                // check not only if the payload exists,
                // but also that the id in the payload matches the user param
                // if (payload && payload.id === req.params.id) {
                let user = await db.User.findOne({ username: req.params.username });
                if (payload && payload.id === user.id) {
                    return next();
                }
                else {
                    return next({
                        status: 401,
                        message: 'User not authorized'
                    })
                }
            })
    } catch (err) {
        return next({
            status: 401,
            message: 'Unauthorized'
        })
    }
}
