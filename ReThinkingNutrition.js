var express = require('express');
var path = require('path');
var app = express();
var handlebars = require('express-handlebars')

app.set('views', path.join(__dirname, 'views'));
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
