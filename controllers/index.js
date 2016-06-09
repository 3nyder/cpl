var express    = require('express');
var router     = express.Router();
var bcrypt     = require('bcrypt');
var user       = require('../models/user');
var types      = require('../helpers/types');
var saltRounds = 10;

router.use('/courses', require('./course'));

router.post('/login', function(req, res) {
    var u = req.body.u;
    var p = req.body.p;

    user.getByEmail(u, function(err, user_db) {
        if (err) {types.makeJSON(res, { error: err });return res.end(err);}

        if(user_db.length > 0) {
            user_db = user_db[0];
            bcrypt.compare(p, user_db.password, function(err, pass_checks) {
                if (err) {types.makeJSON(res, { error: err });return res.end(err);}

                if(pass_checks) {
                    sess               = req.session;
                    sess.authenticated = true;
                    sess.iduser        = user_db.iduser;

                    types.makeJSON(res, { success: 'Success Login' });
                } else {
                    types.makeJSON(res, { error: 'Error on the data' });
                }
            });
        } else {
            types.makeJSON(res, { error: 'Error on the data' });
        }

    });
});

module.exports = router;