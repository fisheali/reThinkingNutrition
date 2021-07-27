var databaseMethods = require('../methods/databaseMethods.js');

function viewAllClients(data, pool, res) {
  console.log('inside viewAllClients method');
  //Database Call logic
  pool.query(
    "SELECT * from Clients")
    .then( response => {
      console.log(response);    //Confirmation console logging for debug
      let returnData = {};
      let list = [];
      for(var i=0; i<response.length; i++)
      {
        list.push(response[i]);
      }
      returnData.response = list;
      res.render('viewallclients', returnData);
    })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Add Client failed with error: " + err);
    });

  pool.release;

  //Return failure or success
  return true;
};


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
      res.render('failure');
    });

  pool.release;

  //Return failure or success
  return true;
};

function clientRecords(data, pool, res) {
  //log data fro debug
  action = '/clientRecords';
  //Database call logic build based on booleans
  let multipleQ = false;
  sqlQuery = "SELECT client_id AS 'Client ID', fname AS 'First Name', lname AS 'Last Name', phone AS 'Phone Number', email AS 'Email Address', address AS 'Street Address', city AS 'City' \
  FROM Clients cl\
  WHERE (fname = ?\
    AND lname = ?)\
    OR (client_id = ?);";

  let placeholders = [];
  placeholders.push(data.fname);
  placeholders.push(data.lname);
  placeholders.push(data.client_id);

  if (data.consultations && data.consultations != "0") {
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
      multipleQ = true;
  }

  if (data.supplements && data.supplements != "0") {
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
      multipleQ = true;
  }

  if (data.articles && data.articles != "0") {
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
      multipleQ = true;
  }
  pool.query(
    sqlQuery,
    placeholders
  )
  .then( response => {
    //Nested IF statement to handle multiple Queries depending on flags sets
    if (multipleQ == true){
      if (response[0].length > 1)
      {
        returnData = databaseMethods.multipleNameRecords(response[0], action, data);
        res.render('choices', returnData);
      }
      else {
        let i = 0;
        var returnData = {record : 0, consultations : 0, supplements : 0, articles : 0};
        let dat = databaseMethods.singleRecord(response[i], 'Client Records');
        returnData.record = [dat];
        i = i + 1;
        if (data.consultations && data.consultations != "0" && response[i].length > 0)
        {
          let condata = databaseMethods.singleRecord(response[i], 'Consultations');
          returnData.consultations = [condata];
          i = i + 1;
        }
        if (data.supplements && data.supplements != "0" && response[i].length > 0)
        {
          let suppData = databaseMethods.singleRecord(response[i], 'Supplements');
          returnData.supplements = [suppData];
          i = i + 1;
        }
        if (data.articles && data.articles != "0" && response[i].length > 0)
        {
          let artData = databaseMethods.singleRecord(response[i], 'Articles');
          returnData.articles = [artData];
          i = i + 1;
        }
        res.render('read', returnData);
    }}
    else {
      if (response.length > 1)
      {
        returnData = databaseMethods.multipleNameRecords(response, action, data);
        res.render('choices', returnData);
      }
      else {
        var returnData = {record : 0};
        let dat = databaseMethods.singleRecord(response, 'Client Records');
        returnData.record = [dat];
      }
      res.render('read', returnData);
    }

    pool.release;
  })
  .catch( err => {                                                   //Error Catching
    console.log("FAILED: ClientRecords failed with error: " + err);
    pool.release;
    res.render('failure');
  });
};

function updateClientRecords(data, pool, res) {
  //log data fro debug
  console.log(data);
  title = "Update Client Records";
  action="/updateClientRecords"

  //Database call logic
  //First call to check # of name Records
  sqlQuery = "SELECT client_id AS 'Client ID', fname AS 'First Name', lname AS 'Last Name', phone AS 'Phone Number', email AS 'Email Address', address AS 'Street Address', city AS 'City' \
  FROM Clients cl\
  WHERE (fname = ?\
    AND lname = ?)\
    OR (client_id = ?);";

  pool.query(
      sqlQuery,
      Object.values(data)
    )
  //Logic to check if there are multiple records returned
    .then( response => {
      if (response.length > 1) {
        returnData = databaseMethods.multipleNameRecords(response, action, data);
        console.log(returnData);
        res.render('choices', returnData);
      }
      else if (data["updateConfirmed"]) {
        sqlQuery = "Update Clients\
        SET fname = ?, lname = ?, phone = ?, email = ?, address = ?, city = ?\
        WHERE (fname = ?\
          AND lname = ?)\
          OR (client_id = ?);SHOW WARNINGS;";
        // pool.release;
        pool.query(
          sqlQuery,
          Object.values(data).splice(4)
        )
        .then( response => {
          console.log(response);
          res.render('success', response);
        })
        .catch( err => {                                                   //Error Catching
          console.log("FAILED: updateClientRecords failed with error: " + err);
          pool.release;
        });
      }
      //Single Record Returned
      else {
        var returnData = {record : 0, title : title};
        let dat = response;
        //NOTE ABSENSE OF BRACKETS
        returnData.record = dat;
        console.log(returnData);
        res.render('update', returnData);
        }
      })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: updateClientRecords failed with error: " + err);
      pool.release;
    });
};

function unpaidInvoices(pool, res) {
  //Database Call logic
  pool.query(
    "SELECT consultation_id AS 'Consultation ID', fname AS 'First Name', lname AS 'Last Name', completed AS 'Completed', paid AS 'Paid?'\
    FROM Consultations co\
    LEFT JOIN Clients cl\
    USING (client_id)\
    WHERE paid = 0;")
    .then( response => {
      console.log(response);
      let returnData = {};
      let dat = databaseMethods.singleRecord(response, "Unpaid Invoices");
      returnData.record = [dat];
      res.render('read', returnData);
    })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Add Client failed with error: " + err);
      res.render('failure');
    });

  pool.release;
}

function clientInvoices(data, pool, res) {
  //log data fro debug
  console.log(data);
  title = "Client Invoices";
  action="/clientInvoices"

  //Database call logic
  //First call to check # of name Records
  sqlQuery = "SELECT client_id AS 'Client ID', fname AS 'First Name', lname AS 'Last Name', phone AS 'Phone Number', email AS 'Email Address', address AS 'Street Address', city AS 'City' \
  FROM Clients cl\
  WHERE (fname = ?\
    AND lname = ?)\
    OR (client_id = ?);";

  pool.query(
      sqlQuery,
      Object.values(data)
    )
  //Logic to check if there are multiple records returned
    .then( response => {
      if (response.length > 1) {
        returnData = databaseMethods.multipleNameRecords(response, action, data);
        console.log(returnData);
        res.render('choices', returnData);
      }
      else
      {
        sqlQuery = "SELECT fname AS 'First Name', lname AS 'Last Name', date AS 'Consultation Date', paid AS 'Paid?', phone AS 'Phone Number', email AS 'Email Address'\
        FROM Consultations co\
        LEFT JOIN Clients cl\
        USING (client_id)\
        WHERE (fname = ?\
          AND lname = ?)\
          OR (client_id = ?);", Object.values(data);

        pool.query(
            sqlQuery,
            Object.values(data)
          )
          .then( response => {
            if (response.length < 1) {
              res.render('form', {title : 'No Matching Records'});
            }
            let returnData = {};
            let dat = databaseMethods.singleRecord(response, "Unpaid Invoices");
            returnData.record = [dat];
            res.render('read', returnData);
          })
          .catch( err => {                                                   //Error Catching
            console.log("FAILED: Client Invoices failed with error: " + err);
            res.render('failure');
          })
        }
      })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Client Invoices failed with error: " + err);
      res.render('failure');
  });
}

function deleteClient(data, pool, res) {
  //log data fro debug
  console.log(data);
  title = "Remove Client";
  action="/deleteClient"

  //Database call logic
  //First call to check # of name Records
  sqlQuery = "SELECT client_id AS 'Client ID', fname AS 'First Name', lname AS 'Last Name', phone AS 'Phone Number', email AS 'Email Address', address AS 'Street Address', city AS 'City' \
  FROM Clients cl\
  WHERE (fname = ?\
    AND lname = ?)\
    OR (client_id = ?);";

  pool.query(
      sqlQuery,
      Object.values(data)
    )
  //Logic to check if there are multiple records returned
    .then( response => {
      if (response.length > 1) {
        returnData = databaseMethods.multipleNameRecords(response, action, data);
        console.log(returnData);
        res.render('choices', returnData);
      }
      else
      {
        sqlQuery = "DELETE\
        FROM Clients\
        WHERE (fname = ?\
          AND lname = ?)\
          OR (client_id = ?);";

        pool.query(
            sqlQuery,
            Object.values(data)
          )
          .then( response => {
            res.render('success');
          })
          .catch( err => {                                                   //Error Catching
            console.log("FAILED: Delete Client failed with error: " + err);
            res.render('failure');
          })
        }
      })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Delete Client failed with error: " + err);
      res.render('failure');
  });
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



function deleteClientFromTable(id, pool, res){
  title = "Remove Client From Table";
  action="/deleteClientFromTable";
  sqlQuery = "DELETE FROM Clients WHERE client_id = ?";
  console.log('inside deleteClientFromTable and printing id', id);
  pool.query(sqlQuery, id)
    .then( response => {
      res.render('success');
    })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Delete Client From Table failed with error: " + err);
      res.render('failure');
    })
  }


function updateClientFromTable(id, pool, res){
  title = "Update Client From Table";
  action="/updateClientFromTable";
  console.log('inside updateClientFromTable and printing id', id);
  let sqlQuery = "SELECT * FROM Clients WHERE client_id = ?";

  pool.query(sqlQuery, id)
  .then( response => {
    
    let client = response[0];
    console.log(client);
    res.render('updateClientFromTable', client);
  })
  .catch( err => {                                                   //Error Catching
    console.log("FAILED: Update Client From Table failed with error: " + err);
    res.render('failure');
  })
}


function updateClientFromTableDatabase(data, pool, res){
  title = "Update Client From Table - Database";
  action="/updateClientFromTableDatabase";

let query = "UPDATE Clients SET fname=?, lname=?, phone=?, email=?, address=?, city=? WHERE client_id=?;";
    let array = [data.fname, data.lname, data.phone, data.email, data.address, data.city, parseInt(data.client_id)];
    pool.query(query, array)
    .then( response => {
      res.render('success');
    })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Update Client From Table Database failed with error: " + err);
      res.render('failure');
    })
  }



exports.addClient = addClient;
exports.clientRecords = clientRecords;
exports.updateClientRecords = updateClientRecords;
exports.unpaidInvoices = unpaidInvoices;
exports.clientInvoices = clientInvoices;
exports.deleteClient = deleteClient;
exports.viewAllClients = viewAllClients;
exports.deleteClientFromTable = deleteClientFromTable;
exports.updateClientFromTable = updateClientFromTable;
exports.updateClientFromTableDatabase = updateClientFromTableDatabase;
