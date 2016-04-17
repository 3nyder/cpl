var db = require('../db');

exports.create = function(lesson_name, description, idcourse, cb) {
    var lesson = {
        lesson     : lesson_name,
        description: description,
        idcourse   : idcourse
    };
    db.save("lesson",lesson,cb);
};

exports.all = function(cb) {
    db.fetch("lesson",{},cb);
};

exports.get = function(idlesson, cb) {
    db.fetch("lesson",{idlesson: idlesson},cb);
};

exports.getByCourse = function(idcourse, cb) {
    db.fetch("lesson",{idcourse: idcourse},cb);
};

exports.delete = function(idlesson, cb) {
    db.delete("lesson",{idlesson: idlesson},cb);
};