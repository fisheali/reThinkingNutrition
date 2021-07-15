//Load Modules
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//Serves images and CSS
app.use(express.static('views/images'));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 42069);

//Serve webpages
app.get('/', function (req, res) {
    res.render('home');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
