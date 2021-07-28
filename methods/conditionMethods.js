<<<<<<< HEAD
function addCondition(data) {
  //log data for debug
  console.log(data);
  title = "Add Condition";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data = [{
    "Condition Name": "Dancer's Hip"
  }];
  //Potential Data Format Method
  val = [];
  for (i = 0; i < sql_data.length; i++) {
    val.push({
      value: Object.values(sql_data[i])
    });
  }

  data = {
    keys: Object.keys(sql_data[0]),
    title: title,
    values: val
  };


  //Return [bool for success, bool for multiple records, data]
  return [true, data];
  //Database Call logic

  //Return failure or success
}

function updateCondition(data) {
  //log data fro debug
  console.log(data);
  title = "Update Condition";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data = [{
    "Condition Name": "Dancer's Leg"
  }];

  //Potential Data Format Method
  val = [];
  for (i = 0; i < sql_data.length; i++) {
    val.push({
      value: Object.values(sql_data[i])
    });
  }

  data = {
    keys: Object.keys(sql_data[0]),
    title: title,
    values: val
  };


  //Return [bool for success, bool for multiple records, data]
  return [true, true, data];
}

function removeCondition(data) {
  //log data fro debug
  console.log(data);
  title = "Remove Condition";

  //Database call logic
=======
function addCondition(data, pool, res) {

  pool.query(
    "INSERT INTO Conditions (condition_name) \
    VALUES (?)", Object.values(data))
    .then( confirmation => {
      console.log(confirmation);      
      return true;                                 //Confirmation console logginf for debug
    })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Add Condition failed with error: " + err);
      return false;
    });
};

function deleteConditionFromTable(id, pool, res){
  title = "Remove Condition From Table";
  action="/deleteConditionFromTable";
  sqlQuery = "DELETE FROM Conditions WHERE condition_id = ?";
  console.log('inside deleteConditionFromTable and printing id', id);
  pool.query(sqlQuery, id)
    .then( response => {
      res.render('success');
    })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Delete Condition From Table failed with error: " + err);
      res.render('failure');
    })
  }



>>>>>>> 81898522ddb812da8bd5099665ce0c626fe4b8f5


<<<<<<< HEAD
  //placeholder data
  sql_data = [{
    "Condition": "Dancer's Toe"
  }];

  //Potential Data Format Method
  val = [];
  for (i = 0; i < sql_data.length; i++) {
    val.push({
      value: Object.values(sql_data[i])
    });
  }

  data = {
    keys: Object.keys(sql_data[0]),
    title: title,
    values: val
  };


  //Return [bool for success, bool for multiple records, data]
  return [true, true, data];
}

function getConditions(data) {
=======



function getConditions(data, pool, res) {
>>>>>>> 81898522ddb812da8bd5099665ce0c626fe4b8f5
  //log data for debug
  console.log('inside viewAllConditions method');
  console.log(data);
  pool.query(
    "SELECT * from Conditions")
    .then( response => {
      console.log(response);    //Confirmation console logging for debug
      let returnData = {};
      let list = [];
      for(var i=0; i<response.length; i++)
      {
        list.push(response[i]);
      }
      returnData.response = list;
      res.render('viewallconditions', returnData);                                    
    })
    .catch( err => {                                                   //Error Catching
      console.log("FAILED: Add Condition failed with error: " + err);
    });

  pool.release;

<<<<<<< HEAD
  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data = [{
      "Condition": "Dancer's Leg"
    },
    {
      "Condition": "Dancer's Brain"
    },
    {
      "Condition": "No Blood Pressure"
    }
  ];
  //Potential Data Format Method
  val = [];
  for (i = 0; i < sql_data.length; i++) {
    val.push({
      value: Object.values(sql_data[i])
    });
  }

  data = {
    keys: Object.keys(sql_data[0]),
    title: title,
    values: val
  };


  //Return [bool for success, bool for multiple records, data]
  return [true, data];
}

function condList(data, pool, res) {
  //Gets cond list
  sqlQuery = "";
}
=======
  //Return failure or success
  return true;
  
};
>>>>>>> 81898522ddb812da8bd5099665ce0c626fe4b8f5

exports.addCondition = addCondition;
exports.deleteConditionFromTable = deleteConditionFromTable;
exports.getConditions = getConditions;
