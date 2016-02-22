var mysql = require('mysql'),
    async = require('async');

var config = require('./config');

exports.MODE_TEST = 'mode_test';
exports.MODE_PROD = 'mode_prod';

var state = {
  pool: null,
  mode: null,
};

exports.connect = function(mode, done) {

  state.pool = mysql.createPool(
    mode === exports.MODE_PROD ? config[prod] : config[test]
  );

  state.mode = mode;
  done();
};

exports.get = function() {
  return state.pool;
};

//takes a JSON object and loads its data into the database
exports.fixtures = function(data) {
  var pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));

  var names = Object.keys(data.tables);
  async.each(names, function(name, cb) {
    async.each(data.tables[name], function(row, cb) {
      var keys = Object.keys(row),
          values = keys.map(function(key) {
            return "'" + row[key] + "'";
          });
      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb);
    }, cb);
  }, done);
};

//clears the data, but not the schemas from all the tables that you want.
exports.drop = function(tables, done) {
  var pool = state.pool;
  if (!pool) return done(new Error('Missing database connection.'));

  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb);
  }, done);
};