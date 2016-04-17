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
        mode === exports.MODE_PROD ? config.prod.database : config.test.database
    );

    state.mode = mode;
    done();
};

//provide with an active connection
exports.get = function(done) {
    var pool = state.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    done(null,pool);
};

exports.save = function(table, object, done) {
    var pool = state.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    var rows   = Object.keys(object);
    var values = rows.map(function(key) {
        return pool.escape(object[key]);
    });

    rows = rows.map(pool.escapeId);

    pool.query('INSERT INTO ' + pool.escapeId(table) + ' (' + rows.join(',') + ') VALUES (' + values.join(',') + ')', function(err, result){
        if (err) return done(err);
        done(null, result.insertId);
    });
};

exports.fetch = function(table, where_obj, done) {
    var pool = state.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    var fetch_query = 'SELECT * FROM ' + pool.escapeId(table);
    if(Object.keys(where_obj).length > 0) {
        var where_strings = [];
        for(var row in where_obj) {
            where_strings.push(pool.escapeId(row) + '=' + pool.escape(where_obj[row]));
        }
        fetch_query += ' WHERE ' + where_strings.join(' AND ');
    }
    pool.query(fetch_query, function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.delete = function(table, where_obj, done) {
    var pool = state.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    var delete_query = "DELETE FROM `" + table + "`";

    if(Object.keys(where_obj).length > 0) {
        var where_strings = [];
        for(var row in where_obj) {
            where_strings.push(row + "='" + where_obj[row] + "'");
        }
        delete_query += " WHERE " + where_strings.join(' AND ');
    } else {
        return done(new Error('Trying to delete all, not allowed.'));
    }

    pool.query(delete_query, function (err, result) {
        if (err) return done(err);
        done(null, result.affectedRows);
    });
};

//takes a JSON object and loads its data into the database
exports.fixtures = function(data, done) {
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
        pool.query('DELETE FROM ' + name, cb);
    }, done);
};