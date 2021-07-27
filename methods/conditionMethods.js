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

function getConditions(data, pool, res) {
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

  //Return failure or success
  return true;
  
};

exports.addCondition = addCondition;
exports.updateCondition = updateCondition;
exports.deleteConditionFromTable = deleteConditionFromTable;
exports.getConditions = getConditions;
