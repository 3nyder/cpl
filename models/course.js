var db = require('../db');

exports.create = function(course_name, description, cb) {
    var course = {
        course     : course_name,
        description: description
    };
    db.save("course",course,cb);
};

exports.all = function(cb) {
    db.fetch("course",{},cb);
};

exports.get = function(idcourse, cb) {
    db.fetch("course",{idcourse: idcourse},cb);
};

exports.delete = function(idcourse, cb) {
    db.delete("course",{idcourse: idcourse},cb);
};