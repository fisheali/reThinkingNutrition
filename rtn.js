//Load Modules
var express = require('express');

//Load Express and Express Handlebars
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//requires
var clientMethods =require('./clientMethods.js');
var consultationMethods =require('./consultationMethods.js');
var articleMethods =require('./articleMethods.js');
var supplementMethods =require('./supplementMethods.js');
var conditionMethods =require('./conditionMethods.js');

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

app.get('/about', (req,res) => {
    res.render('about');
})
app.get('/conditions', function (req, res) {
  res.render('form', { title: 'Conditions', actions: [
                      {action: [
                      {question: 'Add a new condition to treatment',
                      input: '<form action="/addCondition"><label for="add_cond">Add the following condition: </label><input required type="text" id="add_cond" name="add_cond" placeholder="Condition Name"><input type="submit" value="Submit"></form>'}]},

                      {action: [
                        {question: 'View all conditions',
                        input: '<form action="/getCondtions"><input type="submit" value="Submit"></form>'}]},

                      {action: [
                        {question: 'Update a condition',
                        input: '<form action="/updateCondition"><label for="old_cond">Update the following condition: </label><select required class="cond_list" name="old_cond"></select><br>\
                        <label for="new_cond">Updated condition </label><input required type="text" id="new_cond" name="new_cond" placeholder="updated condition name"><br>\
                        <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Remove a condition from treatment',
                      input: '<form action="removeCondition"><label for="remove_cond">Remove the condition </label><select required class="cond_list" name="remove_cond"></select><input type="submit" value="Submit"></form>'}]}
       ]}
    );
});

app.get('/clients', function (req, res) {
  res.render('form', { title: 'Clients', actions: [

                      {action: [
                      {question: 'Add new client',
                      input: '<form action="/clientAdd"><label for="add_client_fname">First Name: </label><input required type="text" id="add_client_fname" name="add_client_fname" placeholder="First Name"><br>\
                      <label for="add_client_lname">Last Name: </label><input required type="text" id="add_client_lname" name="add_client_lname" placeholder="Last Name"><br>\
                      <label for="add_client_phone">Phone Number: </label><input required type="tel" id="add_client_phone" name="add_client_phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="xxx-xxx-xxxx"><br>\
                      <label for="add_client_email">Email: </label><input required type="email" id="add_client_email" name="add_client_email" placeholder="email@example.com"><br>\
                      <label for="add_client_street">Street Address: </label><input required type="text" id="add_client_street" name="add_client_street" placeholder="1234 Example St."><br>\
                      <label for="add_client_city">City: </label><input required type="text" id="add_client_city" name="add_client_city" placeholder="City"><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Retrieve a client\'s records',
                      input: '<form action="/clientRecords"><label for="get_record">Retrieve the records for <input required type="text" id="get_record" name="get_record" placeholder="Last Name, First Name"></label>\
                      including:<br> <input type="checkbox" id="get_record_consultations" name="get_record_consultations" value="consultation_history"<label for="get_record_consultations">Consultation Record</label><br>\
                      <input type="checkbox" id="get_record_supp" name="get_record_supp" value="supplement_history"><label for="get_record_supp">Supplements Record</label><br>\
                      <input type="checkbox" id="get_record_articles" name="get_record_articles" value="article_history"><label for="get_record_articles">Articles Record</label><br><input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Update a client record',
                      input: '<form action="/updateClientRecords"><label for="old_first_name">First Name of Client to Update: </label><input required type="text" id="old_first_name" name="old_first_name" placeholder="first name to update"><br>\
                      <label for="old_last_name">Last Name of Client to Update: </label><input required type="text" id="old_last_name" name="old_last_name" placeholder="last name to update"><br><br>\
                      <label for="update_client_fname">Updated First Name: </label><input type="text" id="updated_client_fname" name="updated_client_fname" placeholder="updated first Nnme"><br>\
                      <label for="update_client_lname">Updated Last Name: </label><input type="text" id="updated_client_lname" name="updated_client_lname" placeholder="updated last name"><br>\
                      <label for="update_client_phone">Updated Phone Number: </label><input type="tel" id="updated_client_phone" name="updated_client_phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="updated xxx-xxx-xxxx"><br>\
                      <label for="update_client_email">Updated Email: </label><input type="email" id="updated_client_email" name="updated_client_email" placeholder="updated email@example.com"><br>\
                      <label for="update_client_street">Updated Street Address: </label><input type="text" id="updated_client_street" name="updated_client_street" placeholder="updated 1234 Example St."><br>\
                      <label for="update_client_city">Updated City: </label><input type="text" id="updated_client_city" name="updated_client_city" placeholder="updated city"><br>\
                      <input type="submit" value="Submit"></form>'}]},


                      {action: [
                      {question: 'View open (unpaid) invoices',
                      input: '<form action="/unpaidInvoices"><label for="open_invoice">View open invoices from the last: <select name="time_frame" id="time_frame"><option value="2_weeks">2 Weeks</option><option value="1 Month">1 Month</option><option value="all_time">All Time</option></select><input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Retrieve a client\'s invoice',
                      input: '<form action="/clientInvoices"><label for="get_invoice">Client Name: <input required type="text" id="get_invoice" name="get_invoice" placeholder="Last Name, First Name"></label><input type="submit" value="Submit"></form>'}]},

                      {action: [
                        {question: 'Remove a client',
                        input: '<form action="deleteClient"><label for="client_remove">Remove the following client: <input required type="text" id="client_remove" name="client_remove" placeholder="Last Name, First Name"></label><input type="submit" value="Submit" onclick="return confirm("Are you sure you want to delete this item?");"></form>'}]}


                    ]}
     );
});

app.get('/consultations', function (req, res) {
  res.render('form', { title: 'Consultations', actions: [
                      {action: [
                      {question: 'Add a new consultation',
                      input: '<form action="/addConsultation"><label for="add_consultation">Add a consultation with </label><input required type="text" id="consultation_client" name="consultation_client" placeholder="Last Name, First Name"><br>\
                      <label for="consultation_date">on </label><input required type="date" id="consultation_date" name="consultation_date"><br>\
                      <label for="consultation_time">at </label><input type="time" id="consultation_time" name="consultation_time"><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'View my upcoming consultations',
                      input: '<form action="/upcomingConsultations"><label for="radio_client">View consultations for: <br><br></label><input type="radio" name="radio_client" id="radio_client_single" value="specific_client"><label for="radio_client_single">A specific client: </label><input type="text" id="specific_client_consultation" name="specific_client_consultation" placeholder="Last Name, First Name"><br>\
                      <input required type="radio" name="radio_client" id="radio_client_all" value="all_clients"><label for="radio_client_all">All clients </label><br><br>\
                      in the next <select name="time_frame" id="time_frame_consultation"><option value="2_weeks">2 Weeks</option><option value="1 Month">1 Month</option><option value="all_time">All Time</option></select>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Update a consultation',
                      input: '<form action="/updateConsultation"><label for="update_consultation">Update a consultation for </label><input required type="text" id="update_consultation_client" name="update_consultation_client" placeholder="Last Name, First Name"><label for="update_consultation_date"> <br>\
                      on </label><input required type="date" name="update_consultation_date" id="update_consultation_date">:<br><br>\
                      <label for="new_consultation_date">New Date: </label><input type="date" id="new_consultation_date" name="new_consultation_date"><br>\
                      <label for="new_cosnultation_time">New Time: </label><input type="time" id="new_consultation_time" name="new_consultation_time"><br>\
                      <label for="complete_consultation">Completed: </label><input type="checkbox" id="complete_consultation" name="complete_consultation" value="complete_consultation"><br>\
                      <label for="paid_consultation">Paid: </label><input type="checkbox" id="paid_consultation" name="paid_consultation" value="paid_consultation"><br>\
                      <label for="consultation_notes">Notes: <textarea id="consultation_notes" name="consultation_notes" rows="5" columns="100" placeholder="Add Notes to Consultation"></textarea><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                        {question: 'Remove a consultation',
                        input: '<form action="/deleteConsultation"><label for="remove_consultation">Remove a consultation for </label><input required type="text" id="update_consultation_client" name="update_consultation_client" placeholder="Last Name, First Name"><label for="remove_consultation_date"> <br>\
                        on </label><input required type="date" name="update_consultation_date" id="update_consultation_date">:<br>\
                        <input type="submit" value="Submit"></form>'}]},


                      {action: [
                      {question: 'Add a new recommendation for a client',
                      input: '<form action="/makeRecommendation"><label for="client_recommendation">Add Recommendation for: </label><input required type="text" id="client_recommendation" name="client_recommendation" placeholder="Last Name, First Name"><br>\
                      <label for="recommendation_condition">for Treatment of Condition: </label><select required class="cond_list" name="treat_cond"></select><br><br>\
                      <label for="supp_rec">Add Supplement: </label><input type="checkbox" id="supp_rec" name="supp_rec" value="supp_rec"><br>\
                      <label for="art_rec">Add Article: </label><input type="checkbox" id="art_rec" name="art_rec" value="art_rec"><br>\
                      <input type="hidden" name="choices" value="true"><input type="submit" value="Submit"></form>'}]},

                      {action: [
                        {question: 'View recommendations',
                        input: '<form action="/viewRecommendations"><label for="view_client_recommendation">View Recommendations for: </label><input required type="text" id="view_client_recommendation" name="view_client_recommendation" placeholder="Last Name, First Name"><br>\
                        <input type="submit" value="Submit"></form>'}]},

                      {action: [
                        {question: 'Remove an existing recommendation',
                        input: '<form action="/removeRecommendations"><label for="client_recommendation">Remove Recommendation for: </label><input required type="text" id="client_recommendation" name="client_recommendation" placeholder="Last Name, First Name"><br>\
                        <input type="hidden" name="choices" value="true"><input type="submit" value="Submit"></form>'}]}
       ]}
     );
});

app.get('/supplements', function (req, res) {
  res.render('form', { title: 'Supplements', actions: [
                      {action: [
                      {question: 'Add a new supplement',
                      input: '<form action="/addSupplement"><label for="type_supp">Supplement Type: </label><input required type="text" id="type_supp" name="type_supp" placeholder="Supplement Type"><br>\
                      <label for="brand_list">from the brand </label><select class="brand_list" name="add_supp_brand"></select><br>\
                      <label for="cond_list">for treatment of </label><select class="cond_list" name="treat_cond"></select><br>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Update a supplement',
                      input: '<form action="/updateSupplement">Update Supplement <label for="update_type_supp"> Type: </label><input required type="text" id="old_update_type_supp" name="type_supp" placeholder="Supplement To Update"><br><br>\
                      <label for="update_type_supp">New Type: </label><input type="text" id="update_type_supp" name="update_type_supp" placeholder="New Supplement Type"><br>\
                      <label for="update_brand_list">New Brand: </label><select class="brand_list" name="update_supp_brand"></select><br>\
                      <label for="cond_list">Add new condition for treatment </label><select class="cond_list" name="treat_cond"></select><br>\
                      <label for="cond_list">Remove condition for treatment </label><select class="remove_cond_list" name="remove_treat_cond"></select><br>\
                      <input type="submit" value="Submit"></form>'}]},


                      {action: [
                      {question: 'Search supplements by condition',
                      input: '<form action="/supplementsByCondition">Search supplements that treat <select required class="cond_list" name="treat_cond"></select>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                      {question: 'Search supplements by brand',
                      input: '<form action="/supplementsByBrand">Search supplements that are made by <select required class="brand_list" name="update_supp_brand"></select>\
                      <input type="submit" value="Submit"></form>'}]},

                      {action: [
                        {question: 'Manage brands (add or remove a brand)',
                        input: '<form action="/addBrand"><label for="add_brand">Add the brand </label><input type="text" id="add_brand" name="add_brand" placeholder="Add Brand"><br><input type="submit" value="Submit"></form><br<br>\
                        <form action="/removeBrand"><label for="remove_brand">Remove the brand </label><select class="brand_list" name="remove_brand"></select><br><input type="submit" value="Submit"></form>'}]}
                       
       ]}
     );
});

app.get('/articles', function (req, res) {
  res.render('form', { title: 'Articles', actions:[
    {action: [
      {question: 'Add an article to library',
      input: '<form action="/addArticle"><label for="title">Title: </label><input required type="text" id="title" name="title" placeholder="article title"><br>\
      <label for="art_supp_list">Article is related to condition: </label><select class="cond_list" name="add_art_cond"></select><br>\
      <label for="art_cond_list">Article is related to supplement: </label><input type="text" id="add_supp_type" name="add_supp_type" placeholder="Supplement Type"> <br>\
      <label for="author">Author: </label><input type="text" id="author" name="author" placeholder="author"><br>\
      <label for="publication">Publication: </label><input type="text" id="publication" name="publication" placeholder="publication"><br>\
      <label for="publish_date">Publish Date: </label><input type="date" id="publish_date" name="publish_date" placeholder="publish date"><br>\
      <label for="website_link">Website link: </label><input type="url" id="website_link" name="website_link" placeholder="website link"><br>\
      <input type="submit" value="Submit"> </form>'}]},

      {action: [
        {question: 'Search articles by condition',
        input: '<form action="/articlesByCondition">Search articles by condition <select required class="cond_list" name="cond"></select><br>\
        <input type="submit" value="Submit"></form>'}]},

    {action: [
      {question: 'Search articles by supplement',
      input: '<form action="/articlesBySupplement"><label for="art_from_supp">Search articles by supplement </label><input required type="text" id="art_from_supp" name="art_from_supp" placeholder="Supplement Type"></select><br>\
      <input type="submit" value="Submit"></form>'}]},

      {action: [
        {question: 'Update an article in library',
        input: '<form action="/updateArticle"><label for="old_title">Title of Article to Update: </label><input required type="text" id="old_title" name="old_title" placeholder="article title to update"><br><br>\
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
        input: '<form action="/removeArticle"><label for="title_to_remove">Title of Article to Remove: </label><input required type="text" id="title_to_remove" name="title_to_remove" placeholder="article title to remove"><br>\
        <input type="submit" value="Submit"> </form>'}]}
    ]}
    );
  });

  app.get('/clientAdd', function(req, res) {
    success = clientMethods.addClient(req.query);
    if (success) {
      res.render('success', { title: "Client", values: Object.values(req.query) }) ;
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/clientRecords', function(req, res) {
    records = clientMethods.clientRecords(req.query);
    if (records[0]) {
      if (records[1]) {
        //Logice for multiple records
      }
      res.render('read', records[2]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/updateClientRecords', function(req, res) {
    records = clientMethods.updateClientRecords(req.query);
    if (records[0]) {
      if (records[1]) {
        //Logice for multiple records
      }
      res.render('success', {title: "Update Client Records", values: Object.values(records[2].values[0])});
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/unpaidInvoices', function(req, res) {
    invoices = clientMethods.unpaidInvoices(req.query);
    if (invoices[0]) {
      res.render('read', invoices[1]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/clientInvoices', function(req, res) {
    records = clientMethods.clientInvoices(req.query);
    if (records[0]) {
      if (records[1]) {
        //Logice for multiple records
      }
      res.render('read', records[2]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/deleteClient', function(req, res) {
    //if (check for multiple records and Confirmation )
    //else
    deleted = clientMethods.deleteClient(req.query);
    if (deleted) {
      res.render('success', {title : "Deleted Client", values : Object.values(deleted[2].values[0])});
    }
    else {
      res.render('failure', req.query);
    }
  })

  app.get('/addConsultation', function(req, res) {
    success = consultationMethods.addConsultation(req.query);
    if (success) {
      res.render('success', { title: "Consultation", values: Object.values(req.query) }) ;
    }
    else {
      res.render('failure', req.query);
    }
  })

  app.get('/upcomingConsultations', function(req, res) {
    consultations = consultationMethods.upcomingConsultations(req.query);
    if (consultations[0]) {
      res.render('read', consultations[1]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/updateConsultation', function(req, res) {
    consultation = consultationMethods.updateConsultation(req.query);
    if (consultation[0]) {
      if (consultation[1]) {
        //Logice for multiple records
      }
      res.render('read', consultation[2]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/deleteConsultation', function(req, res) {
    //if (check for multiple records and Confirmation )
    //else
    deleted = consultationMethods.deleteConsultation(req.query);
    if (deleted) {
      res.render('read', deleted[2]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/makeRecommendation', function(req, res) {
    //if (check for multiple records and Confirmation )
    //else
    recommendations = consultationMethods.makeRecommendation(req.query, res, app);
    //Send to Choice Screen
    if (recommendations[1].choices == 'true') {
      res.render('recommendations', recommendations[1]);
    }
    //Confirmation Screen
    else if (recommendations[1].choices == 'false'){
      res.render('read', recommendations[1]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/viewRecommendations', function(req, res) {
    recommendations = consultationMethods.viewRecommendations(req.query);
    if (recommendations[0]) {
      if (recommendations[1]) {
        //Error handling for multiple entries

      }
      res.render('read', recommendations[2]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/removeRecommendations', function(req, res) {
    //if (check for multiple records and Confirmation )
    //else
    recommendations = consultationMethods.removeRecommendations(req.query, res, app);
    //Send to Choice Screen
    if (recommendations[1].choices == 'true') {
      res.render('recommendations', recommendations[1]);
    }
    //Confirmation Screen
    else if (recommendations[1].choices == 'false'){
      res.render('read', recommendations[1]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/addArticle', function(req, res) {
    data = articleMethods.addArticle(req.query);
    if (data[0] ) {
      res.render('read', data[1]) ;
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/articlesByCondition', function(req, res) {
    articles = articleMethods.articlesByCondition(req.query);
    if (articles[0]) {
      res.render('read', articles[1]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/articlesBySupplement', function(req, res) {
    articles = articleMethods.articlesBySupplement(req.query);
    if (articles[0]) {
      res.render('read', articles[1]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/updateArticle', function(req, res) {
    articles = articleMethods.updateArticle(req.query);
    if (articles[0]) {
      if (articles[1]) {
        //Logice for multiple records
      }
      res.render('read', articles[2]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/removeArticle', function(req, res) {
    //if (check for multiple records and Confirmation )
    //else
    deleted = articleMethods.removeArticle(req.query);
    if (deleted[0]) {
      res.render('read', deleted[2]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/addSupplement', function(req, res) {
    data = supplementMethods.addSupplement(req.query);
    if (data[0] ) {
      res.render('read', data[1]) ;
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/updateSupplement', function(req, res) {
    data = supplementMethods.updateSupplement(req.query);
    if (data[0]) {
      if (data[1]) {
        //Logice for multiple records
      }
      res.render('read', data[2]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/addBrand', function(req, res) {
    data = supplementMethods.addBrand(req.query);
    if (data[0] ) {
      res.render('read', data[1]) ;
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/removeBrand', function(req, res) {
    //if (check for multiple records and Confirmation )
    //else
    deleted = supplementMethods.removeBrand(req.query);
    if (deleted[0]) {
      res.render('read', deleted[2]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/supplementsByCondition', function(req, res) {
    data = supplementMethods.supplementsByCondition(req.query);
    if (data[0]) {
      res.render('read', data[1]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/supplementsByBrand', function(req, res) {
    data = supplementMethods.supplementsByBrand(req.query);
    if (data[0]) {
      res.render('read', data[1]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/addCondition', function(req, res) {
    data = conditionMethods.addCondition(req.query);
    if (data[0] ) {
      res.render('read', data[1]) ;
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/removeCondition', function(req, res) {
    //if (check for multiple records and Confirmation )
    //else
    deleted = conditionMethods.removeCondition(req.query);
    if (deleted[0]) {
      res.render('read', deleted[2]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/updateCondition', function(req, res) {
    data = conditionMethods.updateCondition(req.query);
    if (data[0]) {
      if (data[1]) {
        //Logice for multiple records
      }
      res.render('read', data[2]);
    }
    else {
      res.render('failure', req.query);
    }
  });

  app.get('/getCondtions', function(req, res) {
    data = conditionMethods.getConditions(req.query);
    if (data[0]) {
      res.render('read', data[1]);
    }
    else {
      res.render('failure', req.query);
    }
  });

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
