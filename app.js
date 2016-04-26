var express    = require('express');
var app        = express();
var db         = require('./db');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static(__dirname + '/public'))
//app.use(require('./middlewares/users'))
app.use(require('./controllers'));


// Connect to MySQL on start
db.connect(db.MODE_PROD, function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit(1);
    } else {
        app.listen(3000, function() {
            console.log('Listening on port 3000...');
        });
    }
});