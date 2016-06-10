var db = require('../db');

/*
exports.create = function(course_name, description, cb) {

    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
      // Store hash in your password DB.
    });

    var course = {
        course     : course_name,
        description: description
    };
    db.save("course",course,cb);
};
*/

/*
exports.all = function(cb) {
    db.fetch("course",{},cb);
};
*/

exports.get = function(iduser, cb) {
    db.fetch("user",{iduser: iduser},cb);
};

exports.getByEmail = function(email, cb) {
    db.fetch("user",{email: email},cb);
};

exports.delete = function(iduser, cb) {
    db.delete("user",{iduser: iduser},cb);
};