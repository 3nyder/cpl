var express = require('express');
var router  = express.Router();
var course  = require('../models/course');
//var auth    = require('../middlewares/auth');

router.post('/', function(req, res) {
    course_name = req.body.course_name;
    description = req.body.description;

    course.create(course_name, description, function(err, comment) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ idcourse: comment }));
    });
});

router.get('/', function(req, res) {
    course.all(function (err, comment) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(comment));
    });
});

module.exports = router;