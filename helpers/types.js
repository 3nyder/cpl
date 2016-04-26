exports.makeJSON = function(res, array) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(array));
};