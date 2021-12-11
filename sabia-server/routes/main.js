const express = require('express'),
      db = require('../models');

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