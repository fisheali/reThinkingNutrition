//Load Modules
var express = require('express');
const mariadb = require('mariadb');

//Load Express and Express Handlebars
var app = express();
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main'
});

//requires
var clientMethods = require('./methods/clientMethods.js');
var consultationMethods = require('./methods/consultationMethods.js');
var articleMethods = require('./methods/articleMethods.js');
var supplementMethods = require('./methods/supplementMethods.js');
var conditionMethods = require('./methods/conditionMethods.js');
var databaseMethods = require('./methods/databaseMethods.js');

//Create static file references
app.use(express.static('public'));

//Set up view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8526);

//Create Database pool
const pool = databaseMethods.returnPool();

//Serve webpages
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/conditions', function(req, res) {
  res.render('form', {
    title: 'Conditions',
    actions: [{
        action: [{
          question: 'Add a new condition to treatment',
          input: '<form action="/addCondition"><label for="add_cond">Add the following condition: </label><input required type="text" id="add_cond" name="add_cond" placeholder="Condition Name"><input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'View all conditions',
          input: '<form action="/getConditions">View all conditions: Update | Delete <input type="submit" value="Submit"></form>'
        }]
      }
    ]
  });
});

app.get('/clients', function(req, res) {
  res.render('form', {
    title: 'Clients',
    actions: [

      {
        action: [{
          question: 'Add new client',
          input: '<form action="/clientAdd"><label for="fname">First Name: </label><input required type="text" id="fname" name="fname" placeholder="First Name"><br>\
                      <label for="lname">Last Name: </label><input required type="text" id="lname" name="lname" placeholder="Last Name"><br>\
                      <label for="phone">Phone Number: </label><input required type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="xxx-xxx-xxxx"><br>\
                      <label for="email">Email: </label><input required type="email" id="email" name="email" placeholder="email@example.com"><br>\
                      <label for="street">Street Address: </label><input required type="text" id="address" name="address" placeholder="1234 Example St."><br>\
                      <label for="city">City: </label><input required type="text" id="city" name="city" placeholder="City"><br>\
                      <input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'Retrieve a client\'s records',
          input: '<form action="/clientRecords"><label for="get_record">Retrieve the records for:<br>\
                      <label for="fname">First Name: </label><input required type="text" id="fname" name="fname" placeholder="First Name"><br>\
                      <label for="lname">Last Name: </label><input required type="text" id="lname" name="lname" placeholder="Last Name"><br>\
                      <input type="hidden" id="client_id" name="client_id" value="">\
                      Including:<br>\
                      <input type="checkbox" id="consultations" name="consultations" value="true"><label for="consultations">Consultation Record</label><br>\
                      <input type="checkbox" id="supplements" name="supplements"" value="true"><label for="supplements">Supplements Record</label><br>\
                      <input type="checkbox" id="articles" name="articles" value="true"><label for="articles">Articles Record</label><br><input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'Update a client record',
          input: '<form action="/updateClientRecords"><label for="fname">First Name of Client to Update: </label><input required type="text" id="fname" name="fname" placeholder="first name to update"><br>\
                      <label for="lname">Last Name of Client to Update: </label><input required type="text" id="lname" name="lname" placeholder="last name to update"><br>\
                      <input type="hidden" id="client_id" name="client_id" value="">\
                      <input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'View open (unpaid) invoices',
          input: '<form action="/unpaidInvoices"><input type="submit" value="View"></form>'
        }]
      },

      {
        action: [{
          question: 'Retrieve a client\'s invoice',
          input: '<form action="/clientInvoices"><label for="fname">First Name: </label><input required type="text" id="fname" name="fname" placeholder="First Name"><br>\
                      <label for="lname">Last Name: </label><input required type="text" id="lname" name="lname" placeholder="Last Name"><br>\
                      <input type="hidden" id="client_id" name="client_id" value="">\
                      <input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'Remove a client',
          input: '<form action="deleteClient"><label for="client_remove">Remove the following client: </label><br>\
                      <label for="fname">First Name: </label><input required type="text" id="fname" name="fname" placeholder="First Name"><br>\
                      <label for="rlname">Last Name: </label><input required type="text" id="lname" name="lname" placeholder="Last Name"><br>\
                      <input type="hidden" id="client_id" name="client_id" value="">\
                      <input type="submit" value="Submit" onclick="return confirm("Are you sure you want to delete this item?");"></form>'
        }]
      },

      {
        action: [{
          question: 'View All Clients',
          input: '<form action="/viewAllClients">\
                      View all clients: Update | Delete\
                      <input type="submit" value="Submit""></form>'
        }]
      }
    ]
  });
});

app.get('/consultations', function(req, res) {
  res.render('form', {
    title: 'Consultations',
    actions: [{
        action: [{
          question: 'Add a new consultation',
          input: '<form action="/addConsultation"><label for="add_consultation">Add a consultation with </label><br>\
                      <label for="fname">First Name: </label><input required type="text" id="fname" name="fname" placeholder="First Name"><br>\
                      <label for="lname">Last Name: </label><input required type="text" id="lname" name="lname" placeholder="Last Name"><br>\
                      <label for="date">on </label><input required type="date" id="date" name="date"><br>\
                      <label for="time">at </label><input type="time" id="time" name="time"><br>\
                      <input type="hidden" id="client_id" name="client_id" value="">\
                      <input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'View my upcoming consultations',
          input: '<form action="/upcomingConsultations"><label for="radio_client">View consultations for: <br><br></label><input type="radio" name="radio_client" id="radio_client_single" value="specific_client"><label for="radio_client_single">A specific client: </label><br>\
                      <label for="fname">First Name: </label><input type="text" id="fname" name="fname" placeholder="First Name" value=""><br>\
                      <label for="lname">Last Name: </label><input type="text" id="lname" name="lname" placeholder="Last Name" value=""><br><br>\
                      <input required type="radio" name="radio_client" id="radio_client_all" value="all_clients"><label for="radio_client_all">All clients </label><br>\
                      in the next <select name="time_frame" id="time_frame_consultation"><option value="2_weeks">2 Weeks</option><option value="1_month">1 Month</option><option value="all_time">All Time</option></select>\
                      <input type="hidden" id="client_id" name="client_id" value="">\
                      <input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'Update a consultation',
          input: '<form action="/updateConsultation"><label for="update_consultation">Update a consultation for </label>:<br>\
                      <label for="fname">First Name: </label><input required type="text" id="fname" name="fname" placeholder="First Name"><br>\
                      <label for="lname">Last Name: </label><input required type="text" id="lname" name="lname" placeholder="Last Name"><br>\
                      <input type="hidden" id="client_id" name="client_id" value="">\
                      <input type="hidden" id="consultation_id" name="consultation_id" value="">\
                      <input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'Remove a consultation',
          input: '<form action="/deleteConsultation"><label for="remove_consultation">Remove a consultation for: </label><br><br>\
                      <label for="fname">First Name: </label><input required type="text" id="fname" name="fname" placeholder="First Name"><br>\
                      <label for="lname">Last Name: </label><input required type="text" id="lname" name="lname" placeholder="Last Name"><br>\
                      <label for="remove_consultation_date">\
                      <input type="hidden" id="client_id" name="client_id" value="">\
                      <input type="hidden" id="consultation_id" name="consultation_id" value="">\
                      <input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'Add/Remove Client Condition',
          input: '<form action="/addRemoveClientCond">\
                      <label for="fname">First Name: </label><input required type="text" id="fname" name="fname" placeholder="First Name"><br>\
                      <label for="lname">Last Name: </label><input required type="text" id="lname" name="lname" placeholder="Last Name"><br>\
                      <input type="hidden" id="client_id" name="client_id" value="">\
                      <input type="submit" value="Search"></form>'
        }]
      },

      {
        action: [{
          question: 'Add a new recommendation for a client',
          input: '<form action="/makeRecommendation"><label for="client_recommendation">Add Recommendation for: </label><br>\
                      <label for="fname">First Name: </label><input required type="text" id="fname" name="fname" placeholder="First Name"><br>\
                      <label for="lname">Last Name: </label><input required type="text" id="lname" name="lname" placeholder="Last Name"><br>\
                      <input type="hidden" id="client_id" name="client_id" value="">\
                      <input type="hidden" name="choices" value="true"><input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'View or Remove Recommendations',
          input: '<form action="/viewRemoveRecommendations"><label for="view_client_recommendation">View Recommendations for: </label><br>\
                      <label for="fname">First Name: </label><input required type="text" id="fname" name="fname" placeholder="First Name"><br>\
                      <label for="lname">Last Name: </label><input required type="text" id="lname" name="lname" placeholder="Last Name"><br>\
                      <input type="hidden" id="client_id" name="client_id" value="">\
                      <input type="submit" value="Submit"></form>'
        }]
      }
    ]
  });
});

app.get('/supplements', function(req, res) {
  res.render('form', {
    title: 'Supplements',
    actions: [{
        action: [{
          question: 'Add a new supplement',
          input: '<form action="/addSupplement"><label for="type_supp">Supplement Type: </label><input required type="text" id="type_supp" name="type_supp" placeholder="Supplement Type"><br>\
                      <label for="brand_list">from the brand </label><select class="brand_list" name="add_supp_brand"></select><br>\
                      <label for="cond">for treatment of </label><select class="cond_list" name="cond"></select><br>\
                      <input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'Update a supplement',
          input: '<form action="/updateSupplement">Update Supplement <label for="update_type_supp"> Type: </label><input required type="text" id="old_update_type_supp" name="type_supp" placeholder="Supplement To Update"><br><br>\
                      <label for="update_type_supp">New Type: </label><input type="text" id="update_type_supp" name="update_type_supp" placeholder="New Supplement Type"><br>\
                      <label for="update_brand_list">New Brand: </label><select class="brand_list" name="update_supp_brand"></select><br>\
                      <label for="cond">Add new condition for treatment </label><select class="cond_list" name="cond"></select><br>\
                      <label for="cond">Remove condition for treatment </label><select class="remove_cond_list" name="remove_treat_cond"></select><br>\
                      <input type="submit" value="Submit"></form>'
        }]
      },


      {
        action: [{
          question: 'Search supplements by condition',
          input: '<form action="/supplementsByCondition">Search supplements that treat <select class="cond_list" name="cond" required></select>\
                      <input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'Search supplements by brand',
          input: '<form action="/supplementsByBrand">Search supplements that are made by <select required class="brand_list" name="update_supp_brand"></select>\
                      <input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'Manage brands (add or remove a brand)',
          input: '<form action="/addBrand"><label for="add_brand">Add the brand </label><input type="text" id="add_brand" name="add_brand" placeholder="Add Brand"><br><input type="submit" value="Submit"></form><br<br>\
                        <form action="/removeBrand"><label for="remove_brand">Remove the brand </label><select class="brand_list" name="remove_brand"></select><br><input type="submit" value="Submit"></form>'
        }]
      }

    ]
  });
});

app.get('/articles', function(req, res) {
  renderData = {
    title: 'Articles',
    actions: [{
        action: [{
          question: 'Add an article to library',
          input: '<form action="/addArticle"><label for="title">Title: </label><input required type="text" id="title" name="title" placeholder="article title"><br>\
      <label for="cond">Article is related to condition: </label><select class="cond_list" name="cond"></select><br>\
      <label for="supp">Article is related to supplement: </label><input type="text" id="supp" name="supp" value="" placeholder="Supplement Type"> <br>\
      <label for="author">Author: </label><input type="text" id="author" name="author" value="" placeholder="author"><br>\
      <label for="publication">Publication: </label><input type="text" id="publication" value="" name="publication" placeholder="publication"><br>\
      <label for="date">Publish Date: </label><input type="date" id="date" name="date" value="" placeholder="publish date"><br>\
      <label for="website">Website link: </label><input type="text" id="website" name="website" value="" placeholder="website link"><br>\
      <input type="hidden" name="supp_id" value="">\
      <input type="submit" value="Add Article"> </form>'
        }]
      },

      {
        action: [{
          question: 'Search articles by condition',
          input: '<form action="/articlesByCondition">Search articles by condition <select class="cond_list" name="cond" required></select><br>\
        <input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'Search articles by supplement',
          input: '<form action="/articlesBySupplement"><label for="art_from_supp">Search articles by supplement </label><input type="text" id="supp" name="supp" value="" placeholder="Supplement Type" required></select><br>\
      <input type="submit" value="Submit"></form>'
        }]
      },

      {
        action: [{
          question: 'Update an article in library',
          input: '<form action="/updateArticle"><label for="search">Search for Article to Update: </label><input required type="text" id="search" name="search" placeholder="title or author" required><br><br>\
        <input type="submit" value="Search"> </form>'
        }]
      },

      {
        action: [{
          question: 'Remove an article from library',
          input: '<form action="/removeArticle"><label for="search">Search for Article to Remove: </label><input required type="text" id="search" name="search" placeholder="title or author"><br>\
        <input type="submit" value="Search"> </form>'
        }]
      }
    ]
  };
  pageData = databaseMethods.addDropDowns(pool);
  pageData.then(conditions => {
    finalData = databaseMethods.formatDropDowns(renderData, conditions);
    res.render('form', finalData);
  })
});

app.get('/clientAdd', function(req, res) {
  clientMethods.addClient(req.query, pool, res);
});

app.get('/viewAllClients', function(req, res) {
  clientMethods.viewAllClients(req.query, pool, res);
});

app.get('/clientRecords', function(req, res) {
  records = clientMethods.clientRecords(req.query, pool, res);
});

app.get('/updateClientRecords', function(req, res) {
  clientMethods.updateClientRecords(req.query, pool, res);
});

app.get('/addRemoveClientCond', function(req, res) {
  clientMethods.addRemoveClientCond(req.query, pool, res);
  
});

  app.get('/viewAllClients', function(req, res) {
    clientMethods.viewAllClients(req.query, pool, res);
  });

  app.get('/updateClientFromTable/:id', function(req, res) {
    let id = parseInt(req.params.id);
    clientMethods.updateClientFromTable(id, pool, res);
  });

  app.post('/updateClientFromTable', function(req, res) {
    console.log(req.body);
    let data = req.body;
    clientMethods.updateClientFromTableDatabase(data, pool, res);
    
  });

  app.get('/deleteClientFromTable/:id', function(req, res) {
    let id = parseInt(req.params.id);
    clientMethods.deleteClientFromTable(id, pool, res);
  });


app.get('/unpaidInvoices', function(req, res) {
  clientMethods.unpaidInvoices(pool, res);
});

app.get('/clientInvoices', function(req, res) {
  clientMethods.clientInvoices(req.query, pool, res);
});

app.get('/deleteClient', function(req, res) {
  clientMethods.deleteClient(req.query, pool, res);
});

app.get('/addConsultation', function(req, res) {
  consultationMethods.addConsultation(req.query, pool, res);
})

app.get('/upcomingConsultations', function(req, res) {
  consultationMethods.upcomingConsultations(req.query, pool, res);
});

app.get('/updateConsultation', function(req, res) {
  consultationMethods.updateConsultation(req.query, pool, res);
});

app.get('/deleteConsultation', function(req, res) {
  consultationMethods.deleteConsultation(req.query, pool, res);
});

app.get('/makeRecommendation', function(req, res) {
  consultationMethods.makeRecommendation(req.query, pool, res);
});

app.get('/viewRemoveRecommendations', function(req, res) {
  consultationMethods.viewRecommendations(req.query, pool, res);
});

app.get('/addArticle', function(req, res) {
  articleMethods.addArticle(req.query, pool, res);
});

app.get('/articlesByCondition', function(req, res) {
  articleMethods.articlesByCondition(req.query, pool, res);
});

app.get('/articlesBySupplement', function(req, res) {
  articleMethods.articlesBySupplement(req.query, pool, res);
});

app.get('/updateArticle', function(req, res) {
  articleMethods.updateArticle(req.query, pool, res);
});

app.get('/removeArticle', function(req, res) {
  articleMethods.removeArticle(req.query, pool, res);
});

app.get('/addSupplement', function(req, res) {
  data = supplementMethods.addSupplement(req.query);
  if (data[0]) {
    res.render('read', data[1]);
  } else {
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
  } else {
    res.render('failure', req.query);
  }
});

app.get('/addBrand', function(req, res) {
  data = supplementMethods.addBrand(req.query);
  if (data[0]) {
    res.render('read', data[1]);
  } else {
    res.render('failure', req.query);
  }
});

app.get('/removeBrand', function(req, res) {
  //if (check for multiple records and Confirmation )
  //else
  deleted = supplementMethods.removeBrand(req.query);
  if (deleted[0]) {
    res.render('read', deleted[2]);
  } else {
    res.render('failure', req.query);
  }
});

app.get('/supplementsByCondition', function(req, res) {
  data = supplementMethods.supplementsByCondition(req.query);
  if (data[0]) {
    res.render('read', data[1]);
  } else {
    res.render('failure', req.query);
  }
});

app.get('/supplementsByBrand', function(req, res) {
  data = supplementMethods.supplementsByBrand(req.query);
  if (data[0]) {
    res.render('read', data[1]);
  } else {
    res.render('failure', req.query);
  }
});

app.get('/addCondition', function(req, res) {
  conditionMethods.addCondition(req.query);
});

app.get('/removeCondition', function(req, res) {
  //if (check for multiple records and Confirmation )
  //else
  deleted = conditionMethods.removeCondition(req.query);
  if (deleted[0]) {
    res.render('read', deleted[2]);
  } else {
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
  } else {
    res.render('failure', req.query);
  }
});

app.get('/getConditions', function(req, res) {
  conditionMethods.getConditions(req.query, pool, res);
});

app.get('/condList', function(req, res) {
  res.send(conditionMethods.condList(req.query, pool, res));
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
