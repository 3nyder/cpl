var express = require('express');
var router  = express.Router();
var lesson  = require('../models/lesson');
var types   = require('../helpers/types');
var auth    = require('../middlewares/auth');

router.post('/', auth, function(req, res) {
    lesson_name = req.body.lesson_name;
    description = req.body.description;
    idcourse    = req.body.idcourse;

    lesson.create(lesson_name, description, idcourse, function(err, result) {
        types.makeJSON(res, { idlesson: result });
    });
});

router.get('/', function(req, res) {
    lesson.all(function (err, result) {
        types.makeJSON(res, result);
    });
});

router.get('/:id', function(req, res) {
    id = req.params.id;
    lesson.get(id, function (err, result) {
        types.makeJSON(res, result);
    });
});

router.delete('/:id', auth, function(req, res) {
    id = req.params.id;
    lesson.delete(id, function (err, result) {
        types.makeJSON(res, result);
    });
});

router.put('/:id', auth, function(req, res) {
    var asked = {
        id: req.params.id,
        lesson_name: req.body.lesson_name,
        description: req.body.description
    };

    types.makeJSON(res, asked);

});


module.exports = router;