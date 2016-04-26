var express = require('express');
var router  = express.Router();

router.use('/courses', require('./course'));

// router.get('/', function(req, res) {
//   Comments.all(function(err, comments) {
//     res.render('index', {comments: comments})
//   })
// })

module.exports = router;