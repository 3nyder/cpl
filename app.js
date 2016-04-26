var express      = require('express');
var session      = require('express-session');
var FileStore    = require('session-file-store')(session);
var app          = express();
var db           = require('./db');
var bodyParser   = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    name: 'server-session-cookie-id',
    secret: 'my express secret',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}));

app.use(function printSession(req, res, next) {
  console.log('req.session', req.session);
  return next();
});

//app.use(express.static(__dirname + '/public'))
//app.use(require('./middlewares/users'))
app.use(require('./controllers'));



// Connect to MySQL on start
db.connect(db.MODE_TEST, function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit(1);
    } else {
        app.listen(3000, function() {
            console.log('Listening on port 3000...');
        });
    }
});