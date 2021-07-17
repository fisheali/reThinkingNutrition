// This is a small change.

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
                      <input type="checkbox" id="get_record_supp" name="get_record_supp" value="supplement_history"><label for="get_record_supp">Supplements Record</label><br>\
                      <input type="checkbox" id="get_record_articles" name="get_record_articles" value="article_history"><label for="get_record_articles">Articles Record</label><br><input type="submit" value="Submit"></form>'}]},

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
  res.render('form', { title: 'Consultations', actions: [
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
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to update/complete a consultation',
                      input: '<form><label for="update_consultation">I would like to update the conslutation for </label><input type="text" id="update_consultation_client" name="update_consultation_client" placeholder="Last Name, First Name"><label for="update_consultation_date"> on </label><input type="date" name="update_consultation_date" id="update_consultation_date">:<br>\
                      <label for="new_consultation_date">New Date: </label><input type="date" id="new_consultation_date" name="new_consultation_date"><br>\
                      <label for="new_cosnultation_time">New Time: </label><input type="time" id="new_consultation_time" name="new_consultation_time"><br>\
                      <label for="complete_consultation">Completed: </label><input type="checkbox" id="complete_consultation" name="complete_consultation" value="complete_consultation"><br>\
                      <label for="paid_consultation">Paid: </label><input type="checkbox" id="paid_consultation" name="paid_consultation" value="paid_consultation"><br>\
                      <label for="consultaiton_notes">Notes: <textarea id="consultation_notes" name="consultation_notes" rows="5" columns="100" placeholder="Add Notes to Consultation"></textarea><br><input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to make a new client recommendation',
                      input: '<form><label for="client_reccomendation">I would like to reccomend </label><input type="text" id="client_reccomendation" name="client_reccomendation" placeholder="Last Name, First Name"><br>\
                      <label for="recommendation_type">a </label><select id="recommendation_type" id="recommendation_type"><option value="supplement">Supplement</option><option value="article">Article</option><option value="supp_article">Supplement and Article</option></select><br>\
                      <label for="reccomendation_condition">for treatment of </label><select class="cond_list" name="treat_cond"></select><br><input type="submit" value="Submit"></form>'}]}
       ]}
     );
});

app.get('/supplements', function (req, res) {
  res.render('form', { title: 'Supplements', actions: [
                      {action: [
                      {question: 'I would like to add a new supplement to reccomend',
                      input: '<form>Add Supplement: <br><label for="type_supp">Supplement Type: </label><input type="text" id="type_supp" name="type_supp" placeholder="Supplement Type"><br>\
                      <label for="brand_list">from the brand </label><select class="brand_list" name="add_supp_brand"></select><br>\
                      <label for="cond_list">for treatment of </label><select class="cond_list" name="treat_cond"></select><br>\
                      <label class="add_another" onclick="addAnother(this)">+(Add Another Condition)</label><br>\
                      <label for="store_list">sold at </label><select class="store_list" name="add_remove_store"></select><br>\
                      <label class="add_another_store" onclick="addAnother(this)">+(Add Another Store)</label><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to remove a supplement from my reccomendations',
                      input: '<form><label for="remove_supp">I would like to remove </label><input type="text" id="type_supp" name="type_supp" placeholder="Supplement Type"><label for="remove_supp_brand"> by </label><select class="brand_list" name="add_supp_brand"></select><input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to update a supplement',
                      input: '<form>Update Supplement <label for="update_type_supp"> Type: </label><input type="text" id="old_update_type_supp" name="type_supp" placeholder="Supplement To Update">\
                      <label for="brand_list">From Brand: </label><select class="brand_list" name="old_update_supp_brand"></select><br><br>\
                      <label for="update_type_supp">New Type: </label><input type="text" id="update_type_supp" name="update_type_supp" placeholder="New Supplement Type"><br>\
                      <label for="update_brand_list">New Brand: </label><select class="brand_list" name="update_supp_brand"></select><br>\
                      <label for="cond_list">Add new condition for treatment </label><select class="cond_list" name="treat_cond"></select><br>\
                      <label class="add_another" onclick="addAnother(this)">+(Add Another Condition)</label><br>\
                      <label for="cond_list">Remove condition for treatment </label><select class="remove_cond_list" name="remove_treat_cond"></select><br>\
                      <label class="remove_another" onclick="addAnother(this)">+(Remove Another Condition)</label><br>\
                      <label for="store_list">Add new store </label><select class="store_list" name="add_store"></select><br>\
                      <label class="add_another_store" onclick="addAnother(this)">+(Add Another Store)</label><br>\
                      <label for="store_list">Remove store </label><select class="remove_store_list" name="remove_store"></select><br>\
                      <label class="remove_another_store" onclick="addAnother(this)">+(Remove Another Store)</label><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to add or remove a brand',
                      input: '<form>I would like to  <select name="add_remove_brand" id="add_remove_brand"><option value="add">Add</option><option value="remove">Remove</option></select>\
                      <label for="brand_list"> the brand </label><select class="brand_list" name="add_remove_brand"></select>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to add or remove a store',
                      input: '<form>I would like to  <select name="add_remove_store" id="add_remove_store"><option value="add">Add</option><option value="remove">Remove</option></select>\
                      <label for="store_list"> the store </label><select class="store_list" name="add_remove_store"></select>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to search supplements by condition',
                      input: '<form>I would like to see supplements that treat <select class="cond_list" name="treat_cond"></select>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to search supplements by brand',
                      input: '<form>I would like to see supplements that are made by <select class="brand_list" name="update_supp_brand"></select>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to search where supplements are sold',
                      input: '<form>I would like to see where the <label for="find_type_supp"> type </label><input type="text" id="find_type_supp" name="find_supp" placeholder="Supplement To Find">\
                      <label for="brand_list">from the brand </label><select class="brand_list" name="brand_list"></select><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'I would like to search what supplements a store sells',
                      input: '<form><label for="store_list">I would like to see what supplements are sold by </label><select class="store_list" name="add_remove_store"></select>\
                      <input type="submit" value="Submit"></form>'}]}
       ]}
     );
});

app.get('/articles', function (req, res) {
  res.render('form', { title: 'Articles', actions:[
    {action: [
      {question: 'Add an article to library',
      input: '<form>Add library: <br><br><label for="title">Title: </label><input type="title" id="title" name="title" placeholder="article title"><br>\
      <label for="author">Author: </label><input type="text" id="author" name="author" placeholder="author"><br>\
      <label for="publication">Publication: </label><input type="text" id="publication" name="publication" placeholder="publication"><br>\
      <label for="publish_date">Publish Date: </label><input type="date" id="publish_date" name="publish_date" placeholder="publish date"><br>\
      <label for="website_link">Website link: </label><input type="url" id="website_link" name="website_link" placeholder="website link"><br>\
      <input type="submit" value="Submit"> </form>'}]},


      {action: [
        {question: 'Search articles by author',
        input: '<form>Search articles by author <select class="author" name="search_article_by_author"></select>\
        <input type="submit" value="Submit"></form>'}]},

        {action: [
        {question: 'Search articles by condition',
        input: '<form>Search articles by condition <select class="condition_list" name="search_article_by_condition"></select>\
        <input type="submit" value="Submit"></form>'}]},

        {action: [
        {question: 'Search articles by supplement',
        input: '<form>Search articles by supplement <select class="supplement_list" name="update_supp_brand"></select>\
        <input type="submit" value="Submit"></form>'}]},

        {action: [
        {question: 'Search articles by publication',
        input: '<form>Search articles by publication </label><select class="store_list" name="add_remove_store"></select>\
        <input type="submit" value="Submit"></form>'}]},

        {action: [
        {question: 'Remove an article from library',
        input: '<form> </form>'}]}
    ]}
    );
  });


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
