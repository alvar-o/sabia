const express = require('express'),
      router = express.Router({ mergeParams: true }),
      { ensureCorrectUser } = require('../middleware/auth'),
      { getUser, updateUser } = require('../handlers/users')

// prefix: /api/users/:username
router.route('/')
    .get(getUser)
    .put(ensureCorrectUser, updateUser);

module.exports = router;
