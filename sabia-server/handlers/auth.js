const db = require('../models'),
      jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
    try {
        console.log(req.body)
        // find user
        let user = await db.User.findOne({email: req.body.email});
        let { id, username, email, profileImageUrl } = user;

        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign(
                { id, username, profileImageUrl }, 
                process.env.SECRET_KEY);
            
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            })
        } else {
            return next({
                status: 400,
                message: 'Invalid email/password.'
            })
        }
    } catch (err) {
        return next({
            status: 400,
            message: 'Invalid email/password.'
        })
    }

}

exports.signup = async function(req, res, next) {
    try {
        // create a user
        let user = await db.User.create(req.body);
        let { id, username, profileImageUrl} = user;
        
        // create a token (sign a token)
        // process.env.SECRET_KEY is where we find the env variable we created
        let token = jwt.sign(
            { id, username, profileImageUrl }, 
            process.env.SECRET_KEY);
        
        return res.status(200).json({ id, username, profileImageUrl, token});

    } catch (err) {
        // if validation fails
        if (err.code === 11000) {
            err.message = 'Sorry, that username and/or email has already been registered.';
        }
        // otherwise send back a generic 400 (bad request)
        // (actually sending that anyway, but with extra info)
        return next({
            status: 400,
            message: err.message
        })
    }
}