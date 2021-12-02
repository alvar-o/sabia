const express = require('express'),
      router = express.Router({ mergeParams: true }),
      { createMessage, getMessage, deleteMessage } = require('../handlers/messages');

// prefix: /api/users/:username/messages
router.route('/')
    .post(createMessage);

router.route('/:id')
    .get(getMessage)
    .delete(deleteMessage)

module.exports = router;
