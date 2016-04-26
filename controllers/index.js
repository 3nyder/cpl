var express = require('express');
var router  = express.Router();

router.use('/courses', require('./course'));

router.get('/login', function(req, res) {
    //TODO user and password check

    sess = req.session;

    sess.authenticated = true;
    res.end('done');

});

module.exports = router;