const express = require('express'),
      db = require('../models');


exports.getUser = async function(req, res, next) {
    try {
        const user = await db.User.findOne({username: req.params.username})
            .populate('messages');
        const { username, email, messages } = user;
        res.status(200).json({ username, email, messages });
    } catch (err) {
        
    }
}

exports.getAllMessages = async function (req, res, next) {
    try {
        let messages = await db.Message.find()
            .sort({ createdAt: 'desc' })
            .populate('user', {
                username: true,
                profileImageUrl: true
            });
        res.status(200).json(messages);
    } catch (err) {
        next(err)
    }
}