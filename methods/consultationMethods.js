var databaseMethods = require('../methods/databaseMethods.js');

function addConsultation(data, pool, res) {
  action = '/addConsultation'
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
        res.render('choices', returnData);
      }
      else
      {
        sqlQuery = "INSERT INTO Consultations (date, time, client_id)\
        VALUES (?, ?, ?);";
        pool.query(
            sqlQuery,
            [data.date, data.time, data.client_id]
          )
          .then( response => {
            res.render('success');
          })
          .catch( err => {                                                   //Error Catching
            console.log("FAILED: Add Consultation failed with error: " + err);
            res.render('failure');
          })
        }
      })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Add Consultation failed with error: " + err);
      res.render('failure');
  });
};

function upcomingConsultations(data, pool, res) {
  //log data fro debug
  console.log(data);
  title = "Upcoming Consultations";
  action = '/upcomingConsultations'
  //First call to check # of name Records
  sqlQuery = "SELECT client_id AS 'Client ID', fname AS 'First Name', lname AS 'Last Name', phone AS 'Phone Number', email AS 'Email Address', address AS 'Street Address', city AS 'City' \
  FROM Clients cl\
  WHERE (fname = ?\
    AND lname = ?)\
    OR (client_id = ?);";

  pool.query(
      sqlQuery,
      [data.fname, data.lname, data.client_id]
    )
  //Logic to check if there are multiple records returned
    .then( response => {
      if (response.length > 1) {
        returnData = databaseMethods.multipleNameRecords(response, action, data);
        res.render('choices', returnData);
      }
      else {
        //Build SQL Call based on inputs
        sqlQuery = "SELECT consultation_id AS 'Consultation ID', fname AS 'First Name', lname AS 'Last Name', date AS 'Date', time AS 'Time'\
        FROM Consultations\
        LEFT JOIN Clients\
        USING (client_id)\
        WHERE "

        if (data.time_frame != 'all_time')
        {
          var timeFrame
          if (data.time_frame == '2_weeks'){
            timeFrame = '14';
          }
          else {
            timeFrame = '30';
          }
          sqlQuery = sqlQuery + "DATEDIFF(DATE_ADD(CURDATE(), INTERVAL + " + timeFrame + " DAY), date) >= 0\
          AND ";
        }

        sqlQuery = sqlQuery + "date > CURDATE()"

        if (data.radio_client == 'specific_client')
        {
          sqlQuery = sqlQuery + " AND client_id = ?;";
          pool.query(
            sqlQuery,
            [data.client_id]
          )
          .then( response => {
            console.log(response);
            let returnData = {};
            let dat = databaseMethods.singleRecord(response, title);
            returnData.record = [dat];
            res.render('read', returnData);
          })
          .catch( err => {                                                   //Error Catching
            console.log("FAILED: View Upcoming Consultations failed with error: " + err);
            res.render('failure');
          });
        }
        else
        {
          sqlQuery = sqlQuery + ";";
          pool.query(
            sqlQuery
          )
          .then( response => {
            console.log(response);
            let returnData = {};
            let dat = databaseMethods.singleRecord(response, title);
            returnData.record = [dat];
            res.render('read', returnData);
          })
          .catch( err => {                                                   //Error Catching
            console.log("FAILED: View Upcoming Consultations failed with error: " + err);
            res.render('failure');
          });
        }
      }
    })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: View Upcoming Consultations failed with error: " + err);
      res.render('failure');
  });
}

function updateConsultation(data) {
  //log data fro debug
  console.log(data);
  title = "Update Client Consultation";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"first name": "Calvin", "last namne": "Todd", "phone": "703-282-6899", "email": "toddcal@oregonstate.edu", "date": "april 5th 2011", "time": "4:20", "completed" : true, "paid" : false, "notes" : "Calvin made great progress today, we are all very proud of him"}
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

function deleteConsultation(data) {
  //log data fro debug
  console.log(data);
  title = "Remove Consultation";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
  [
    {"first name": "Calvin", "last namne": "Todd", "phone": "703-282-6899", "email": "toddcal@oregonstate.edu", "date": "Febuary 3rd 1955", "time": "5:30"}
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

function makeRecommendation(data) {
  //log data for debugging
  console.log(data);
  title = "Make Reccomendation";

  //SQL call for recceomendations
  if (data.choices == 'true') {
    sql_data = [{reccomendations : [{"articles" : ["art1 ", "art2", "art3"], "supplements" : ["supp1", "supp2", "supp3"]}]}];
    data = {keys : Object.keys(sql_data[0].reccomendations[0]), title : title, articles: Object.values(sql_data[0].reccomendations[0].articles), supplements:  Object.values(sql_data[0].reccomendations[0].supplements), choices : data.choices};
  }
  else {
    sql_data = [data];
    val = []
    for (i = 0; i < sql_data.length; i++) {
      val.push({value : Object.values(sql_data[i])});
    }

    data = {keys : Object.keys(sql_data[0]), title : title, values: val, choices : data.choices};
  }

  //Data Format


  //Return [bool for success, data]
  return [true, data]
}

function viewReccomendations(data) {
  //log data fro debug
  console.log(data);
  title = "View Reccomendations";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"first name": "Calvin", "last namne": "Todd", "Reccomended Articles": "[Article 1, Articles 2, Article 3]"},
      {"first name": "Calvin", "last namne": "Todd", "Reccomended Supplements": "[Supplement 1, Supplement 2, Supplement 3]"}
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

function removeReccomendations(data) {
  //log data for debugging
  console.log(data);
  title = "Remove Reccomendation";

  //SQL call for recceomendations
  if (data.choices == 'true') {
    sql_data = [{reccomendations : [{"articles" : ["art1 ", "art2", "art3"], "supplements" : ["supp1", "supp2", "supp3"]}]}];
    data = {title: title, keys : Object.keys(sql_data[0].reccomendations[0]), title : title, articles: Object.values(sql_data[0].reccomendations[0].articles), supplements:  Object.values(sql_data[0].reccomendations[0].supplements), choices : data.choices};
  }
  else {
    sql_data = [data];
    val = []
    for (i = 0; i < sql_data.length; i++) {
      val.push({value : Object.values(sql_data[i])});
    }

    data = {keys : Object.keys(sql_data[0]), title : title, values: val, choices : data.choices};
  }

  //Data Format


  //Return [bool for success, data]
  return [true, data]
}
exports.addConsultation = addConsultation;
exports.upcomingConsultations = upcomingConsultations;
exports.updateConsultation = updateConsultation;
exports.deleteConsultation = deleteConsultation;
exports.makeRecommendation = makeRecommendation;
exports.viewReccomendations = viewReccomendations;
exports.removeReccomendations = removeReccomendations;
