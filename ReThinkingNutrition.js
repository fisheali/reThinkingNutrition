//Load Modules
var express = require('express');
var exphbs  = require('express-handlebars');

//Create express instance
var app = express();

//Serves images and CSS
app.use(express.static('views/images'));
app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Serve webpages
app.get('/', function (req, res) {
    res.render('home');
});

app.listen(42069);
