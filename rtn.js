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
app.set('port', 8522);


//Serve webpages
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/conditions', function (req, res) {
  res.render('form', { title: 'Conditions', actions: [
                      {action: [
                      {question: 'Add a new condition to treatment',
                      input: '<form><label for="add_cond">Add the following condition: </label><input type="text" id="add_cond" name="add_cond" placeholder="Condition Name"><input type="submit" value="Submit"></form>'}]},

                      {action: [
                        {question: 'View all conditions',
                        input: '<form><input type="submit" value="Submit"></form>'}]},


                      {action: [
                        {question: 'Update a condition',
                        input: '<form><label for="old_cond">Update the following condition: </label><select class="cond_list" name="old_cond"></select><br>\
                        <label for="new_cond">Updated condition </label><input type="text" id="new_cond" name="new_cond" placeholder="updated condition name"><br>\
                        <input type="submit" value="Submit"></form>'}]},




                      {action: [
                      {question: 'Remove a condition from treatment',
                      input: '<form><label for="remove_cond">Remove the condition </label><select class="cond_list" name="remove_cond"></select><input type="submit" value="Submit"></form>'}]}
       ]}
    );
});

app.get('/clients', function (req, res) {
  res.render('form', { title: 'Clients', actions: [

                      {action: [
                      {question: 'Add new client',
                      input: '<form><label for="add_client_fname">First Name: </label><input type="text" id="add_client_fname" name="add_client_fname" placeholder="First Name"><br>\
                      <label for="add_client_lname">Last Name: </label><input type="text" id="add_client_lname" name="add_client_lname" placeholder="Last Name"><br>\
                      <label for="add_client_phone">Phone Number: </label><input type="tel" id="add_client_phone" name="add_client_phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="xxx-xxx-xxxx"><br>\
                      <label for="add_client_email">Email: </label><input type="email" id="add_client_email" name="add_client_email" placeholder="email@example.com"><br>\
                      <label for="add_client_street">Street Address: </label><input type="text" id="add_client_street" name="add_client_street" placeholder="1234 Example St."><br>\
                      <label for="add_client_city">City: </label><input type="text" id="add_client_city" name="add_client_city" placeholder="City"><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Retrieve a client\'s records',
                      input: '<form><label for="get_record">Retrieve the records for <input type="text" id="get_record" name="get_record" placeholder="Last Name, First Name"></label>\
                      including:<br> <input type="checkbox" id="get_record_consultations" name="get_record_consultations" value="consultation_history"<label for="get_record_consultations">Consultation Record</label><br>\
                      <input type="checkbox" id="get_record_supp" name="get_record_supp" value="supplement_history"><label for="get_record_supp">Supplements Record</label><br>\
                      <input type="checkbox" id="get_record_articles" name="get_record_articles" value="article_history"><label for="get_record_articles">Articles Record</label><br><input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Update a client record',
                      input: '<form><label for="old_first_name">First Name of Client to Update: </label><input type="text" id="old_first_name" name="old_first_name" placeholder="first name to update"><br>\
                      <label for="old_last_name">Last Name of Client to Update: </label><input type="text" id="old_last_name" name="old_last_name" placeholder="last name to update"><br><br>\
                      <label for="update_client_fname">Updated First Name: </label><input type="text" id="updated_client_fname" name="updated_client_fname" placeholder="updated first Nnme"><br>\
                      <label for="update_client_lname">Updated Last Name: </label><input type="text" id="updated_client_lname" name="updated_client_lname" placeholder="updated last name"><br>\
                      <label for="update_client_phone">Updated Phone Number: </label><input type="tel" id="updated_client_phone" name="updated_client_phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="updated xxx-xxx-xxxx"><br>\
                      <label for="update_client_email">Updated Email: </label><input type="email" id="updated_client_email" name="updated_client_email" placeholder="updated email@example.com"><br>\
                      <label for="update_client_street">Updated Street Address: </label><input type="text" id="updated_client_street" name="updated_client_street" placeholder="updated 1234 Example St."><br>\
                      <label for="update_client_city">Updated City: </label><input type="text" id="updated_client_city" name="updated_client_city" placeholder="updated city"><br>\
                      <input type="submit" value="Submit"></form>'}]},


                      {action: [
                      {question: 'View open (unpaid) invoices',
                      input: '<form><label for="open_invoice">View open invoices from the last: <select name="time_frame" id="time_frame"><option value="2_weeks">2 Weeks</option><option value="1 Month">1 Month</option><option value="all_time">All Time</option></select><input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Retrieve a client\'s invoice',
                      input: '<form><label for="get_invoice">Client Name: <input type="text" id="get_invoice" name="get_invoice" placeholder="Last Name, First Name"></label><input type="submit" value="Submit"></form>'}]},

                      {action: [
                        {question: 'Remove a client',
                        input: '<form><label for="client_remove">Remove the following client: <input type="text" id="client_remove" name="client_remove" placeholder="Last Name, First Name"></label><input type="submit" value="Submit"></form>'}]}


                    ]}
     );
});

app.get('/consultations', function (req, res) {
  res.render('form', { title: 'Consultations', actions: [
                      {action: [
                      {question: 'Add a new consultation',
                      input: '<form><label for="add_consultation">Add a consultation with </label><input type="text" id="consultation_client" name="consultation_client" placeholder="Last Name, First Name"><br>\
                      <label for="consultation_date">on </label><input type="date" id="consultation_date" name="consultation_date"><br>\
                      <label for="consultation_time">at </label><input type="time" id="consultation_time" name="consultation_time"><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'View my upcoming consultations',
                      input: '<form><label for="radio_client">View consultations for: <br><br></label><input type="radio" name="radio_client" id="radio_client_single" value="specific_client"><label for="radio_client_single">A specific client: </label><input type="text" id="specific_client_consultation" name="specific_client_consultation" placeholder="Last Name, First Name"><br>\
                      <input type="radio" name="radio_client" id="radio_client_all" value="all_clients"><label for="radio_client_all">All clients </label><br><br>\
                      in the next <select name="time_frame" id="time_frame_consultation"><option value="2_weeks">2 Weeks</option><option value="1 Month">1 Month</option><option value="all_time">All Time</option></select>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Update a consultation',
                      input: '<form><label for="update_consultation">Update a consultation for </label><input type="text" id="update_consultation_client" name="update_consultation_client" placeholder="Last Name, First Name"><label for="update_consultation_date"> <br>\
                      on </label><input type="date" name="update_consultation_date" id="update_consultation_date">:<br><br>\
                      <label for="new_consultation_date">New Date: </label><input type="date" id="new_consultation_date" name="new_consultation_date"><br>\
                      <label for="new_cosnultation_time">New Time: </label><input type="time" id="new_consultation_time" name="new_consultation_time"><br>\
                      <label for="complete_consultation">Completed: </label><input type="checkbox" id="complete_consultation" name="complete_consultation" value="complete_consultation"><br>\
                      <label for="paid_consultation">Paid: </label><input type="checkbox" id="paid_consultation" name="paid_consultation" value="paid_consultation"><br>\
                      <label for="consultaiton_notes">Notes: <textarea id="consultation_notes" name="consultation_notes" rows="5" columns="100" placeholder="Add Notes to Consultation"></textarea><br><input type="submit" value="Submit"></form>'}]},

                      {action: [
                        {question: 'Remove a consultation',
                        input: '<form><label for="remove_consultation">Remove a consultation for </label><input type="text" id="update_consultation_client" name="update_consultation_client" placeholder="Last Name, First Name"><label for="remove_consultation_date"> <br>\
                        on </label><input type="date" name="update_consultation_date" id="update_consultation_date">:<br>\
                        <input type="submit" value="Submit"></form>'}]},


                      {action: [
                      {question: 'Add a new client recommendation',
                      input: '<form><label for="client_recommendation">Add Recommendation for: </label><input type="text" id="client_reccomendation" name="client_reccomendation" placeholder="Last Name, First Name"><br>\
                      <label for="recommendation_condition">for Treatment of Condition: </label><select class="cond_list" name="treat_cond"></select><br><br>\
                      <label for="supp_rec">Add Supplement: </label><input type="checkbox" id="supp_rec" name="supp_rec" value="supp_rec"><br>\
                      <label for="art_rec">Add Article: </label><input type="checkbox" id="art_rec" name="art_rec" value="art_rec"><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                        {question: 'View client recommendations',
                        input: '<form><label for="view_client_recommendation">View Recommendations for: </label><input type="text" id="view_client_recommendation" name="view_client_recommendation" placeholder="Last Name, First Name"><br>\
                        <input type="submit" value="Submit"></form>'}]},

                      {action: [
                        {question: 'Remove an existing client recommendation',
                        input: '<form><label for="client_recommendation">Remove Recommendation for: </label><input type="text" id="client_reccomendation" name="client_reccomendation" placeholder="Last Name, First Name"><br>\
                        <input type="submit" value="Submit"></form>'}]}
       ]}
     );
});

app.get('/supplements', function (req, res) {
  res.render('form', { title: 'Supplements', actions: [
                      {action: [
                      {question: 'Add a new supplement',
                      input: '<form><label for="type_supp">Supplement Type: </label><input type="text" id="type_supp" name="type_supp" placeholder="Supplement Type"><br>\
                      <label for="brand_list">from the brand </label><select class="brand_list" name="add_supp_brand"></select><br>\
                      <label for="cond_list">for treatment of </label><select class="cond_list" name="treat_cond"></select><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Update a supplement',
                      input: '<form>Update Supplement <label for="update_type_supp"> Type: </label><input type="text" id="old_update_type_supp" name="type_supp" placeholder="Supplement To Update">\
                      <label for="brand_list">From Brand: </label><select class="brand_list" name="old_update_supp_brand"></select><br><br>\
                      <label for="update_type_supp">New Type: </label><input type="text" id="update_type_supp" name="update_type_supp" placeholder="New Supplement Type"><br>\
                      <label for="update_brand_list">New Brand: </label><select class="brand_list" name="update_supp_brand"></select><br>\
                      <label for="cond_list">Add new condition for treatment </label><select class="cond_list" name="treat_cond"></select><br>\
                      <label for="cond_list">Remove condition for treatment </label><select class="remove_cond_list" name="remove_treat_cond"></select><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Add or remove a brand',
                      input: '<form><label for="add_brand">Add the brand </label><input type="text" id="add_brand" name="add_brand" placeholder="Add Brand"><input type="submit" value="Submit"></form><br<br>\
                      <form><label for="remove_brand">Remove the brand </label><select class="brand_list" name="remove_brand"></select><input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Search supplements by condition',
                      input: '<form>Search supplements that treat <select class="cond_list" name="treat_cond"></select>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Search supplements by brand',
                      input: '<form>Search supplements that are made by <select class="brand_list" name="update_supp_brand"></select>\
                      <input type="submit" value="Submit"></form>'}]},

       ]}
     );
});

app.get('/articles', function (req, res) {
  res.render('form', { title: 'Articles', actions:[
    {action: [
      {question: 'Add an article to library',
      input: '<form><label for="title">Title: </label><input type="text" id="title" name="title" placeholder="article title"><br>\
      <label for="art_supp_list">Article is related to condition: </label><select class="cond_list" name="add_art_cond"></select><br>\
      <label for="art_cond_list">Article is related to supplement: </label><input type="text" id="add_supp_type" name="add_supp_type" placeholder="Supplement Type"> from <select class="brand_list" name="add_art_supp"></select><br>\
      <label for="author">Author: </label><input type="text" id="author" name="author" placeholder="author"><br>\
      <label for="publication">Publication: </label><input type="text" id="publication" name="publication" placeholder="publication"><br>\
      <label for="publish_date">Publish Date: </label><input type="date" id="publish_date" name="publish_date" placeholder="publish date"><br>\
      <label for="website_link">Website link: </label><input type="url" id="website_link" name="website_link" placeholder="website link"><br>\
      <input type="submit" value="Submit"> </form>'}]},

    {action: [
      {question: 'Search articles by condition',
      input: '<form>Search articles by condition <select class="cond_list" name="old_cond"></select></select>\
      <input type="submit" value="Submit"></form>'}]},

    {action: [
      {question: 'Search articles by supplement',
      input: '<form><label for="art_from_supp">Search articles by supplement </label><input type="text" id="art_from_supp" name="art_from_supp" placeholder="Supplement Type"></select>\
      <input type="submit" value="Submit"></form>'}]},



    {action: [
      {question: 'Update an article in library',
      input: '<form><label for="old_title">Title of Article to Update: </label><input type="text" id="old_title" name="old_title" placeholder="article title to update"><br><br>\
      <label for="new_title">Updated Title: </label><input type="text" id="new_title" name="new_title" placeholder="updated title"><br>\
      <label for="add_remove_art_supp">Add/Remove </label> <select name="add_remove_art_supp" id="add_remove_art_supp"><option value="no_action">No Action</option><option value="add">Add</option><option value="remove">Remove</option></select>\
      relation to condition: <select class="cond_list" name="add_remove_art_cond_list"></select><br>\
      <label for="add_remove_art_cond">Add/Remove </label><select name="add_remove_art_cond" id="add_remove_art_cond"><option value="no_action">No Action</option><option value="add">Add</option><option value="remove">Remove</option></select>\
      relation to supplement:<input type="text" id="update_art_supp" name="update_art_supp" placeholder="Supplement Type"> from <select class="brand_list" name="update_art_supp_brand"></select><br>\
      <label for="new_author">Updated Author: </label><input type="text" id="new_author" name="new_author" placeholder="updated author"><br>\
      <label for="new_publication">Updated Publication: </label><input type="text" id="new_publication" name="new_publication" placeholder="updated publication"><br>\
      <label for="new_publish_date">Updated Publish Date: </label><input type="date" id="new_publish_date" name="new_publish_date" placeholder="updated publish date"><br>\
      <label for="new_website_link">Updated Website link: </label><input type="url" id="new_website_link" name="new_website_link" placeholder="updated website link"><br>\
      <input type="submit" value="Submit"> </form>'}]},

      {action: [
        {question: 'Remove an article from library',
        input: '<form><label for="title_to_remove">Title of Article to Remove: </label><input type="text" id="title_to_remove" name="title_to_remove" placeholder="article title to remove"><br>\
        <input type="submit" value="Submit"> </form>'}]}
    ]}
    );
  });


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
