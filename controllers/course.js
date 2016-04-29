var express = require('express');
var router  = express.Router();
var course  = require('../models/course');
var lesson  = require('../models/lesson');
var types   = require('../helpers/types');
var auth    = require('../middlewares/auth');

router.post('/', auth, function(req, res) {
    course_name = req.body.course_name;
    description = req.body.description;

    course.create(course_name, description, function(err, result) {
        types.makeJSON(res, { idcourse: result });
    });
});

router.get('/', function(req, res) {
    course.all(function (err, result) {
        types.makeJSON(res, result);
    });
});

router.get('/:id', function(req, res) {
    id = req.params.id;
    course.get(id, function (err, result) {
        types.makeJSON(res, result);
    });
});

router.delete('/:id', auth, function(req, res) {
    id = req.params.id;
    course.delete(id, function (err, result) {
        types.makeJSON(res, result);
    });
});

router.put('/:id', auth, function(req, res) {
    var asked = {
        id: req.params.id,
        course_name: req.body.course_name,
        description: req.body.description
    };

    types.makeJSON(res, asked);

});

router.get('/:id/lessons', function(req, res) {
    id = req.params.id;
    lesson.getByCourse(id, function (err, result) {
        types.makeJSON(res, result);
    });
});


module.exports = router;