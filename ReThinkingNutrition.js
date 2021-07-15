//Load Modules
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//Create express instance
var app = express();

//Serves images and CSS
app.use(express.static('views/images'));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Serve webpages
app.get('/', function (req, res) {
    res.render('home');
});

app.listen(42069);
