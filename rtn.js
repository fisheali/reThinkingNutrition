//Load Modules
var express = require('express');

//Load Express and Express Handlebars
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//Create static file references
app.use(express.static('public'));

//Set up view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 42069);


//Serve webpages
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/conditions', function (req, res) {
  res.render('form', { title: 'Conditions', actions: [ {action: [
                      {question: 'I would like to add a new condition to treatment',
                      input: '<form><label for="add_cond">I would like to add the following condition</label><input type="text" id="add_cond" name="add_cond"><input type="submit" value="Submit"></form>'}]},
                      {action: [
                      {question: 'I would like to remove a condition from treatment',
                      input: '<form><label for="remove_cond">I would like to remove the following condition </label><select id="cond_list" name="remove_cond"></select><input type="submit" value="Submit"></form>'}]}
       ]}
    );
});

app.get('/clients', function (req, res) {
  res.render('form');
});

app.get('/consultations', function (req, res) {
  res.render('form');
});

app.get('/supplements', function (req, res) {
  res.render('form');
});

app.get('/articles', function (req, res) {
  res.render('form');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
