var databaseMethods = require('../methods/databaseMethods.js');

function addClient(data, pool) {
  //Database Call logic
  pool.query(
    "INSERT INTO Clients (fname, lname, phone, email, address, city) \
    VALUES (?, ?, ?, ?, ?, ?)", Object.values(data))
    .then( confirmation => {
      console.log(confirmation);                                       //Confirmation console logginf for debug
    })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Add Client failed with error: " + err);
    });

  pool.release;

  //Return failure or success
  return true;
};

function clientRecords(data, pool, res) {
  //log data fro debug
  action = '/clientRecords';
  //Database call logic build based on booleans
  sqlQuery = "SELECT client_id AS 'Client ID', fname AS 'First Name', lname AS 'Last Name', phone AS 'Phone Number', email AS 'Email Address', address AS 'Street Address', city AS 'City' \
  FROM Clients cl\
  WHERE (fname = ?\
    AND lname = ?)\
    OR (client_id = ?);";

  let placeholders = [];
  placeholders.push(data.fname);
  placeholders.push(data.lname);
  placeholders.push(data.client_id);

  if (data["consultations"]) {
    sqlQuery = sqlQuery + "SELECT fname AS 'First Name', lname AS 'Last Name', consultation_id AS 'Consultation ID', date AS 'Date', time AS 'Time', completed AS 'Consultation Completed', paid AS 'Paid?', note AS 'Notes'\
    FROM Clients cl\
    JOIN Consultations co\
    USING (client_id)\
    WHERE (fname = ?\
      AND lname = ?)\
      OR (client_id = ?);";

      placeholders.push(data.fname);
      placeholders.push(data.lname);
      placeholders.push(data.client_id);
  }

  if (data["supplements"]) {
    sqlQuery = sqlQuery + "SELECT supplement_id AS 'Supplement ID', date_recommended AS 'Date Reccomended', type AS 'Type', brand_name AS 'Brand'\
    FROM Clients cl\
    JOIN Clients_Supplements cs\
    USING (client_id)\
    JOIN Supplements s\
    USING (supplement_id)\
    LEFT JOIN Brands b\
    USING (brand_id)\
    WHERE (fname = ?\
      AND lname = ?)\
      OR (client_id = ?);";

      placeholders.push(data.fname);
      placeholders.push(data.lname);
      placeholders.push(data.client_id);
  }

  if (data["articles"]) {
    sqlQuery = sqlQuery + "SELECT article_id AS 'Article ID', ca.date_recommended AS 'Date Reccomended', title AS 'Title', publish_date AS 'Publish Date', publication AS 'Publication', author AS 'Author', website AS 'Website'\
    FROM Clients cl\
    JOIN Clients_Articles ca\
    USING (client_id)\
    JOIN Articles a\
    USING (article_id)\
    WHERE (fname = ?\
      AND lname = ?)\
      OR (client_id = ?);";

      placeholders.push(data.fname);
      placeholders.push(data.lname);
      placeholders.push(data.client_id);
  }

  pool.query(
    sqlQuery,
    placeholders
  )
  .then( response => {
    if (response[0].length > 1)
    {
      returnData = databaseMethods.multipleNameRecords(response[0], action, data);
      console.log(returnData);
      res.render('choices', returnData);
    }
    else {
      let i = 0;
      var returnData = {record : 0, consultations : 0, supplements : 0, articles : 0};
      let dat = databaseMethods.singleRecord(response[i], 'Client Records');
      returnData.record = [dat];
      i = i + 1;
      if (data["consultations"])
      {
        let condata = databaseMethods.singleRecord(response[i], 'Consultations');
        returnData.consultations = [condata];
        i = i + 1;
      }
      if (data["supplements"])
      {
        let suppData = databaseMethods.singleRecord(response[i], 'Supplements');
        returnData.supplements = [suppData];
        i = i + 1;
      }
      if (data["articles"])
      {
        let artData = databaseMethods.singleRecord(response[i], 'Articles');
        returnData.articles = [artData]; 
        i = i + 1;
      }
      res.render('read', returnData);
    }
    pool.release;
  })
  .catch( err => {                                                   //Error Catching
    console.log("FAILED: ClientRecords failed with error: " + err);
    pool.release;
  });
}

function updateClientRecords(data) {
  //log data fro debug
  console.log(data);
  title = "Update Client Records";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"first name": "Calvin", "last namne": "Todd", "phone": "703-282-6899", "email": "toddcal@oregonstate.edu", "address": "220 Evergreen", "city": "Imperial Beach"},
      {"first name": "Michelle", "last namne": "Gomez", "phone": "1800AWESOME", "email": "MishSquish@notreal.com", "address": "220 Evergreen", "city": "Tiajuana"}
    ];

//Potential Data Format Method
  val = []
  for (i = 0; i < sql_data.length; i++) {
    val.push({value : Object.values(sql_data[i])});
  }

  data = {keys : Object.keys(sql_data[0]), title : title, values: val};


  //Return [bool for success, bool for multiple records, data]
  return [true, true, data]
}

function unpaidInvoices(data) {
  //log data fro debug
  console.log(data);
  title = "Unpaid Invoices";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"consutation_id" : 123123, "first name": "Calvin", "last namne": "Todd", "date": "July 1, 2011", "email": "toddcal@oregonstate.edu", "completed" : true, "paid" : false},
      {"consutation_id" : 152656, "first name": "Michelle", "last namne": "Gomez", "date": "August 20, 1969", "email": "MishSquish@notreal.com", "completed" : true, "paid" : false}
    ];

//Potential Data Format Method
  val = []
  for (i = 0; i < sql_data.length; i++) {
    val.push({value : Object.values(sql_data[i])});
  }

  data = {keys : Object.keys(sql_data[0]), title : title, values: val};


  //Return [bool for success, bool for multiple records, data]
  return [true, data]
}

function clientInvoices(data) {
  //log data fro debug
  console.log(data);
  title = "Client Invoices";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"first name": "Calvin", "last namne": "Todd", "date": "May 3, 1988", "completed": false, "paid" : true},
      {"first name": "Calvin", "last namne": "Todd", "date": "January 20, 1993", "completed": true, "paid" : false}
    ];

//Potential Data Format Method
  val = []
  for (i = 0; i < sql_data.length; i++) {
    val.push({value : Object.values(sql_data[i])});
  }

  data = {keys : Object.keys(sql_data[0]), title : title, values: val};


  //Return [bool for success, bool for multiple records, data]
  return [true, true, data]
}

function deleteClient(data) {
  //log data fro debug
  console.log(data);
  title = "Remove Client";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
  [
    {"first name": "Calvin", "last namne": "Todd", "phone": "703-282-6899", "email": "toddcal@oregonstate.edu", "address": "220 Evergreen", "city": "Imperial Beach"},
    {"first name": "Michelle", "last namne": "Gomez", "phone": "1800AWESOME", "email": "MishSquish@notreal.com", "address": "220 Evergreen", "city": "Tiajuana"}
  ];

//Potential Data Format Method
  val = []
  for (i = 0; i < sql_data.length; i++) {
    val.push({value : Object.values(sql_data[i])});
  }

  data = {keys : Object.keys(sql_data[0]), title : title, values: val};


  //Return [bool for success, bool for multiple records, data]
  return [true, true, data]
}

function addRemoveClientCond(data) {
  //log data fro debug
  console.log(data);
  //If Else to create title based on Add or Remove
  title = "Add/Remove Client";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
  [
    {"first name": "Calvin", "last namne": "Todd", "phone": "703-282-6899", "email": "toddcal@oregonstate.edu", "address": "220 Evergreen", "city": "Imperial Beach"}
  ];

//Potential Data Format Method
  val = []
  for (i = 0; i < sql_data.length; i++) {
    val.push({value : Object.values(sql_data[i])});
  }

  data = {keys : Object.keys(sql_data[0]), title : title, values: val};


  //Return [bool for success, bool for multiple records, data]
  return [true, true, data]
}



exports.addClient = addClient;
exports.clientRecords = clientRecords;
exports.updateClientRecords = updateClientRecords;
exports.unpaidInvoices = unpaidInvoices;
exports.clientInvoices = clientInvoices;
exports.deleteClient = deleteClient;
