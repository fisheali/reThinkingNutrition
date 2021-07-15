//Load Modules
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//Create express instance
app.use(express.static('views/images'));
app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Serve webpages
app.get('/', function (req, res) {
    res.render('home');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
