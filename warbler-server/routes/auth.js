const express = require('express'),
      router = express.Router(),
      { signin, signup } = require('../handlers/auth');

router.post('/signup', signup);
router.post('/signin', signin);


module.exports = router;