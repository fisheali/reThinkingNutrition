function addClient(data) {
  //log data for debug
  console.log(data);

  //Database Call logic

  //Return failure or success
  return true;
};

function clientRecords(data) {
  //log data fro debug
  console.log(data);
  title = "Client Records";

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
