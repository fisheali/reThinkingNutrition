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
  res.render('form', { title: 'Conditions', actions: [
                      {action: [
                      {question: 'I would like to add a new condition to treatment',
                      input: '<form><label for="add_cond">I would like to add the following condition </label><input type="text" id="add_cond" name="add_cond" placeholder="Condition Name"><input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to remove a condition from treatment',
                      input: '<form><label for="remove_cond">I would like to remove the condition </label><select class="cond_list" name="remove_cond"></select><input type="submit" value="Submit"></form>'}]}
       ]}
    );
});

app.get('/clients', function (req, res) {
  res.render('form', { title: 'Clients', actions: [

                      {action: [
                      {question: 'Add new client for treatment',
                      input: '<form><label for="add_client_fname">Add New Client:<br>First Name: </label><input type="text" id="add_client_fname" name="add_client_fname" placeholder="First Name"><br>\
                      <label for="add_client_lname">Last Name: </label><input type="text" id="add_client_lname" name="add_client_lname" placeholder="Last Name"><br>\
                      <label for="add_client_phone">Phone Number: </label><input type="tel" id="add_client_phone" name="add_client_phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="xxx-xxx-xxxx"><br>\
                      <label for="add_client_email">Email: </label><input type="email" id="add_client_email" name="add_client_email" placeholder="email@example.com"><br>\
                      <label for="add_client_street">Street Address: </label><input type="text" id="add_client_street" name="add_client_street" placeholder="1234 Example St."><br>\
                      <label for="add_client_city">City: </label><input type="text" id="add_client_city" name="add_client_city" placeholder="City"><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to add a condition to a client for treatment',
                      input: '<form><label for="treat_cond">I would like to add the following condition <select class="cond_list" name="treat_cond"></select>\
                      for Client <input type="text" id="treat_cond_client" name="treat_cond_client" placeholder="Last Name, First Name"></label><input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to remove a client from treatment',
                      input: '<form><label for="client_remove">I would like to remove the following client: <input type="text" id="client_remove" name="client_remove" placeholder="Last Name, First Name"></label><input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to update a client record',
                      input: '<form><label for="update_client_fname">Update Client:<br>First Name: </label><input type="text" id="update_client_fname" name="update_client_fname" placeholder="First Name"><br>\
                      <label for="update_client_lname">Last Name: </label><input type="text" id="update_client_lname" name="update_client_lname" placeholder="Last Name"><br>\
                      <label for="update_client_phone">Phone Number: </label><input type="tel" id="update_client_phone" name="update_client_phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="xxx-xxx-xxxx"><br>\
                      <label for="update_client_email">Email: </label><input type="email" id="update_client_email" name="update_client_email" placeholder="email@example.com"><br>\
                      <label for="update_client_street">Street Address: </label><input type="text" id="update_client_street" name="update_client_street" placeholder="1234 Example St."><br>\
                      <label for="update_client_city">City: </label><input type="text" id="update_client_city" name="update_client_city" placeholder="City"><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to get a clients records',
                      input: '<form><label for="get_record">I would like to get the client record for <input type="text" id="get_record" name="get_record" placeholder="Last Name, First Name"></label>\
                      incuding:<br> <input type="checkbox" id="get_record_consultations" name="get_record_consultations" value="consultation_history"<label for="get_record_consultations">Consultation Record</label><br>\
                      <input type="checkbox" id="get_record_supp" name="get_record_supp" value="supplement_history"<label for="get_record_supp">Supplements Record</label><br>\
                      <input type="checkbox" id="get_record_articles" name="get_record_articles" value="article_history"<label for="get_record_articles">Articles Record</label><br><input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to see my open (unpaid) invoices',
                      input: '<form><label for="open_invoice">I would like to see open invoice for the last: <select name="time_frame" id="time_frame"><option value="2_weeks">2 Weeks</option><option value="1 Month">1 Month</option><option value="all_time">All Time</option></select><input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to get a specifc invoice',
                      input: '<form><label for="get_invoice">I would like to get invoice number: <input type="text" id="get_invoice" name="get_invoice" placeholder="Invoice #"></label><input type="submit" value="Submit"></form>'}]}
       ]}
     );
});

app.get('/consultations', function (req, res) {
  res.render('form', { title: 'Conditions', actions: [
                      {action: [
                      {question: 'I would like to add a new consultation',
                      input: '<form><label for="add_consultation">I would like to add a conslutation with </label><input type="text" id="consultation_client" name="consultation_client" placeholder="Last Name, First Name">\
                      <label for="consultation_date">on </label><input type="date" id="consultation_date" name="consultation_date">\
                      <label for="cosnultation_time">at </label><input type="time" id="consultation_time" name="consultation_time"><input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to see my upcoming consultations',
                      input: '<form><label for="radio_client">I would like to see the consultations for: <br></label><input type="radio" name="radio_client" id="radio_client_single" value="specific_client"><label for="radio_client_single">A specific client: </label><input type="text" id="specific_client_consultation" name="specific_client_consultation" placeholder="Last Name, First Name"><br>\
                      <input type="radio" name="radio_client" id="radio_client_all" value="all_clients"><label for="radio_client_all">All clients </label><br>\
                      in the next <select name="time_frame" id="time_frame_consultation"><option value="2_weeks">2 Weeks</option><option value="1 Month">1 Month</option><option value="all_time">All Time</option></select>\
                      <input type="submit" value="Submit"><input type="submit" value="Submit"></form>'}]}
       ]}
     );
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
