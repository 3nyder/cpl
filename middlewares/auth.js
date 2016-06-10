var types = require('../helpers/types');

module.exports = function(req, res, next) {

    return next();

    sess = req.session;
    if (sess && sess.authenticated) {
        return next();
    }

    res.status(401);
    types.makeJSON(res,{error: 'No session found'});
    res.end();
};