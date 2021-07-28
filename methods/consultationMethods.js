var databaseMethods = require('../methods/databaseMethods.js');

function addConsultation(data, pool, res) {
  action = '/addConsultation'
  //First call to check # of name Records
  nameData = databaseMethods.nameRecords(pool, data);
  //Logic to check if there are multiple records returned
  nameData.then(response => {
    if (!data.client_id) {
      returnData = databaseMethods.multipleNameRecords(response, action, data);
      pool.release;
      res.render('choices', returnData);
    } else {
      sqlQuery = "INSERT INTO Consultations (date, time, client_id)\
        VALUES (?, ?, ?);";
      pool.query(
          sqlQuery,
          [data.date, data.time, data.client_id]
        )
        .then(response => {
          res.render('success');
        })
        .catch(err => { //Error Catching
          console.log("FAILED: Add Consultation failed with error: " + err);
          pool.release;
          res.render('failure');
        })
    }
  })
  nameData.catch(err => { //Error Catching
    pool.release;
    console.log("FAILED: Add Consultation failed with error: " + err);
    res.render('failure');
  });
};

function upcomingConsultations(data, pool, res) {
  //log data fro debug
  title = "Upcoming Consultations";
  action = '/upcomingConsultations'
  //First call to check # of name Records
  nameRecords = databaseMethods.nameRecords(pool, data);
  //Logic to check if there are multiple records returned
  nameRecords.then(response => {
    if (!data.client_id && data.radio_client != 'all_clients') {
      returnData = databaseMethods.multipleNameRecords(response, action, data);
      pool.release;
      res.render('choices', returnData);
    } else {
      //Build SQL Call based on inputs
      sqlQuery = "SELECT consultation_id AS 'Consultation ID', fname AS 'First Name', lname AS 'Last Name', date AS 'Date', time AS 'Time'\
        FROM Consultations\
        LEFT JOIN Clients\
        USING (client_id)\
        WHERE "

      if (data.time_frame != 'all_time') {
        var timeFrame
        if (data.time_frame == '2_weeks') {
          timeFrame = '14';
        } else {
          timeFrame = '30';
        }
        sqlQuery = sqlQuery + "DATEDIFF(DATE_ADD(CURDATE(), INTERVAL + " + timeFrame + " DAY), date) >= 0\
          AND ";
      }

      sqlQuery = sqlQuery + "date > CURDATE()"

      if (data.radio_client == 'specific_client') {
        sqlQuery = sqlQuery + " AND client_id = ?;";
        pool.query(
            sqlQuery,
            [data.client_id]
          )
          .then(response => {
            console.log(response);
            let returnData = {};
            let dat = databaseMethods.singleRecord(response, title);
            returnData.record = [dat];
            pool.release;
            res.render('read', returnData);
          })
          .catch(err => { //Error Catching
            console.log("FAILED: View Upcoming Consultations failed with error: " + err);
            pool.release;
            res.render('failure');
          });
      } else {
        sqlQuery = sqlQuery + ";";
        pool.query(
            sqlQuery
          )
          .then(response => {
            let returnData = {};
            let dat = databaseMethods.singleRecord(response, title);
            pool.release;
            returnData.record = [dat];
            res.render('read', returnData);
          })
          .catch(err => { //Error Catching
            console.log("FAILED: View Upcoming Consultations failed with error: " + err);
            pool.release;
            res.render('failure');
          });
      }
    }
  })
  nameRecords.catch(err => { //Error Catching
    console.log("FAILED: View Upcoming Consultations failed with error: " + err);
    pool.release;
    res.render('failure');
  });
}

function updateConsultation(data, pool, res) {
  title = "Update Consultations";
  action = "/updateConsultation"

  //Database call logic
  //First call to check # of name Records
  nameRecords = databaseMethods.nameRecords(pool, data);
  //Logic to check if there are multiple records returned
  nameRecords.then(response => {
    if (!data.client_id) {
      returnData = databaseMethods.multipleNameRecords(response, action, data);
      pool.release;
      res.render('choices', returnData);
    } else if (data["updateConfirmed"]) {
      if (!data.completed) {
        data.completed = 0;
      }
      if (!data.paid) {
        data.paid = 0;
      }
      sqlQuery = "UPDATE Consultations\
        SET date = ?, time = ?, completed = ?, paid = ?, note = ?\
        WHERE consultation_id = ?;";
      // pool.release;
      pool.query(
          sqlQuery,
          [data.date, data.time, data.completed, data.paid, data.notes, data.consultation_id]
        )
        .then(response => {
          pool.release;
          res.render('success', response);
        })
        .catch(err => { //Error Catching
          console.log("FAILED: updateClientRecords failed with error: " + err);
          pool.release;
        });
    }
    //Single Record Returned
    else {
      sqlQuery = "SELECT consultation_id AS 'Consultation ID', fname AS 'First Name', lname AS 'Last Name', date AS 'Date', time AS 'Time', paid AS 'Paid', completed AS 'Completed', note AS 'Notes', client_id AS 'Client ID'\
        FROM Consultations\
        JOIN Clients\
        USING (client_id)\
        WHERE (consultation_id = ?)\
        OR (client_id = ?)\
        OR (fname = ? AND lname = ?);";

      pool.query(
          sqlQuery,
          [data.consultation_id, data.client_id, data.fname, data.lname]
        )
        .then(response => {
          if (!data.consultation_id) {
            returnData = databaseMethods.multipleRecords(response, action, data);
            pool.release;
            res.render('choices', returnData);
          } else {
            var returnData = {
              record: 0,
              title: title
            };
            let dat = response;
            //NOTE ABSENSE OF BRACKETS
            returnData.record = dat;
            pool.release;
            res.render('update', returnData);
          }
        })
        .catch(err => { //Error Catching
          console.log("FAILED: updateClientRecords failed with error: " + err);
          pool.release;
        });
    }
  })
  nameRecords.catch(err => { //Error Catching
    console.log("FAILED: updateClientRecords failed with error: " + err);
    pool.release;
  });
};

function deleteConsultation(data, pool, res) {
  //log data fro debug
  title = "Delete Consultations";
  action = "/deleteConsultation"

  //Database call logic
  //First call to check # of name Records
  nameRecords = databaseMethods.nameRecords(pool, data);
  //Logic to check if there are multiple records returned
  nameRecords.then(response => {
    console.log(data);
    if (!data.client_id) {
      returnData = databaseMethods.multipleNameRecords(response, action, data);
      pool.release;
      res.render('choices', returnData);
    } else if (data.consultation_id) {

      sqlQuery = "DELETE\
        FROM Consultations\
        WHERE (consultation_id = ?);";
      // pool.release;
      pool.query(
          sqlQuery,
          [data.consultation_id]
        )
        .then(response => {
          pool.release;
          res.render('success', response);
        })
        .catch(err => { //Error Catching
          console.log("FAILED: updateClientRecords failed with error: " + err);
          pool.release;
        });
    }
    //Single Record Returned
    else {
      sqlQuery = "SELECT client_id AS 'Client ID', consultation_id AS 'Consultation ID', fname AS 'First Name', lname AS 'Last Name', date AS 'Date', time AS 'Time', paid AS 'Paid', completed AS 'Completed', note AS 'Notes'\
        FROM Consultations\
        JOIN Clients\
        USING (client_id)\
        WHERE (consultation_id = ?)\
        OR (client_id = ?)\
        OR (fname = ? AND lname = ?);";

      pool.query(
          sqlQuery,
          [data.consultation_id, data.client_id, data.fname, data.lname]
        )
        .then(response => {
          returnData = databaseMethods.multipleRecords(response, action, data);
          res.render('choices', returnData);
        })
        .catch(err => { //Error Catching
          console.log("FAILED: updateClientRecords failed with error: " + err);
          pool.release;
        });
    }
  })
  nameRecords.catch(err => { //Error Catching
    console.log("FAILED: updateClientRecords failed with error: " + err);
    pool.release;
  });
};


function makeRecommendation(data, pool, res) {
  //log data for debugging
  action = '/makeRecommendation';
  title = 'Make a Recommendation';

  //Name Checking
  nameRecords = databaseMethods.nameRecords(pool, data);

  nameRecords.then(response => {
    if (!data.client_id) {
      records = databaseMethods.multipleNameRecords(response, action, data);
      pool.release;
      res.render('choices', returnData);
    } else if (data.stage == 'stageTwo') {
      condList = databaseMethods.condList(pool, {
        client_id: data.client_id,
        full_list: true
      })
      condList.then(response => {
        console.log(response);
        returnData = {
          client_id: data.client_id,
          fname: data.fname_non_null,
          lname: data.lname_non_null,
          con: response,
          con_choice: true,
          action: action,
          title: title
        };
        console.log(returnData);
        console.log(data);
        res.render('makerecommendation', returnData)
      })
      condList.catch(err => {
        console.log("MakeRecommendation Failed with: " + err);
        res.render('failure');
      })
    } else if (data.stage == 'recs') {
      sqlQuery = "";
      params = [];

      sqlQuery += "SELECT co.condition_name AS 'Condition Name', css.supplement_id AS 'Supplement ID', type AS 'Type', brand_name AS 'Brand'\
      FROM Conditions co\
      JOIN Conditions_Supplements cs\
      USING (condition_id)\
      JOIN\
      (\
           SELECT s.supplement_id, s.type, s.brand_id\
           FROM Supplements s\
           LEFT JOIN\
           (\
               SELECT client_id, supplement_id\
               FROM Clients_Supplements cl\
               WHERE client_id = ?\
           ) as cs\
           ON (s.supplement_id = cs.supplement_id)\
           WHERE client_id IS NULL\
      ) css\
      ON (cs.supplement_id = css.supplement_id)\
      LEFT JOIN Brands b\
      ON (css.brand_id = b.brand_id)\
      WHERE (condition_id = ?);"




      sqlQuery += "SELECT condition_name AS 'Condition Name', asz.article_id AS 'Article ID', title AS 'Title', author AS 'Author', publication AS 'Publication', website AS 'Website'\
      FROM Conditions co\
      JOIN Conditions_Articles ca\
      USING (condition_id)\
      JOIN\
      (\
           SELECT a.article_id, a.title, a.author, a.publication, a.website\
           FROM Articles a\
           LEFT JOIN\
           (\
               SELECT client_id, article_id\
               FROM Clients_Articles al\
               WHERE client_id = ?\
           ) AS asx\
           ON (a.article_id = asx.article_id)\
           WHERE client_id IS NULL\
      ) asz\
      ON (ca.article_id = asz.article_id)\
      WHERE (condition_id = ?);"



      //DB call
      pool.query(
          sqlQuery,
          [data.client_id, data.condition_id, data.client_id, data.condition_id]
        )
        .then(response => {
          console.log(response);
          returnData = {
            client_id: data.client_id,
            fname: data.fname,
            lname: data.lname,
            rec_choice: true,
            action: action,
            title: title,
            art_rec: response[1],
            supp_rec: response[0],
            button: "Add Selected Recommendations"
          }
          res.render('makerecommendation', returnData);
        })
        .catch(err => {
          console.log(err);
        })
    } else if (data.stage == "update") {

      sqlQuery = "";
      params = [];

      if (data.supplement) {
        for (let i = 0; i < data.supplement.length; i++) {
          sqlQuery += "INSERT INTO Clients_Supplements (date_recommended, client_id, supplement_id)\
        VALUES (CURDATE(), ?, ?);"
          params.push(data.client_id);
          params.push(data.supplement[i]);
        }
      }

      if (data.article) {
        for (let i = 0; i < data.article.length; i++) {
          sqlQuery += "INSERT INTO Clients_Articles (date_recommended, client_id, article_id)\
        VALUES (CURDATE(), ?, ?);"
          params.push(data.client_id);
          params.push(data.article[i]);
        }
      }
      pool.query(
          sqlQuery,
          params
        )
        .then(response => {
          console.log(response);
          res.render('success');
        })
        .catch(err => {
          console.log(err);
        })
    }
  })
}

function viewRecommendations(data, pool, res) {
  //log data fro debug
  title = "Client Records";
  action = '/viewRemoveRecommendations'
  nameRecords = databaseMethods.nameRecords(pool, data);

  nameRecords.then(response => {
    if (!data.client_id) {
      records = databaseMethods.multipleNameRecords(response, action, data);
      pool.release;
      res.render('choices', returnData);
    }
    //Get all recceomendations
    else if (data.stage == 'stageTwo') {
      sqlQuery = "SELECT fname AS 'First Name', lname AS 'Last Name', article_id as 'Article ID', date_recommended AS 'Date Recommended', title AS 'Title', author AS 'Author', publication AS 'Publication', website as 'Website'\
    FROM Clients c\
    JOIN Clients_Articles ca\
    USING (client_id)\
    JOIN Articles a\
    USING (article_id)\
    WHERE client_id = ?;SELECT fname AS 'First Name', lname AS 'Last Name', supplement_id as 'Supplement ID', date_recommended AS 'Date Recommended', type AS 'Type', brand_name AS 'Brand'\
    FROM Clients c\
    JOIN Clients_Supplements cs\
    USING (client_id)\
    JOIN Supplements s\
    USING (supplement_id)\
    LEFT JOIN Brands b\
    USING (brand_id)\
    WHERE client_id = ?;"

      pool.query(
          sqlQuery,
          [data.client_id, data.client_id]
        )
        .then(response => {
          returnData = {
            client_id: data.client_id,
            fname: data.fname,
            lname: data.lname,
            rec_choice: true,
            action: action,
            title: title,
            art_rec: response[0],
            supp_rec: response[1],
            button: "Remove Selected Recommendations"
          }
          res.render('makerecommendation', returnData);
        })
        .catch(err => {
          console.log(err);
        })
    } else if (data.stage == 'update') {
      sqlQuery = "";
      params = [];

      if (data.supplement) {
        for (let i = 0; i < data.supplement.length; i++) {
          sqlQuery += "DELETE FROM Clients_Supplements WHERE client_id = ? AND supplement_id = ?;"
          params.push(data.client_id);
          params.push(data.supplement[i]);
        }
      }

      if (data.article) {
        for (let i = 0; i < data.article.length; i++) {
          sqlQuery += "DELETE FROM Clients_Articles WHERE client_id = ? AND supplement_id = ?;"
          params.push(data.client_id);
          params.push(data.article[i]);
        }
      }
      pool.query(
          sqlQuery,
          params
        )
        .then(response => {
          console.log(response);
          res.render('success');
        })
        .catch(err => {
          console.log(err);
        })
    }
  })
  nameRecords.catch(err => {
    console.log(err);
  })
}

exports.addConsultation = addConsultation;
exports.upcomingConsultations = upcomingConsultations;
exports.updateConsultation = updateConsultation;
exports.deleteConsultation = deleteConsultation;
exports.makeRecommendation = makeRecommendation;
exports.viewRecommendations = viewRecommendations;
