var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());
app.use('/api', require('./routes/api'));


var server = app.listen(3000, function () {
    console.log('Started at port 3000');
});