var express = require('express');
var router  = express.Router();
var course  = require('../models/course');
var types   = require('../helpers/types');
var auth    = require('../middlewares/auth');

router.post('/', auth, function(req, res) {
    course_name = req.body.course_name;
    description = req.body.description;

    course.create(course_name, description, function(err, comment) {
        types.makeJSON(res, { idcourse: comment });
    });
});

router.get('/', function(req, res) {
    course.all(function (err, comment) {
        types.makeJSON(res, comment);
    });
});

router.get('/:id', function(req, res) {
    id = req.params.id;
    course.get(id, function (err, comment) {
        types.makeJSON(res, comment);
    });
});

router.delete('/:id', function(req, res) {
    id = req.params.id;
    course.delete(id, function (err, comment) {
        types.makeJSON(res, comment);
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


module.exports = router;