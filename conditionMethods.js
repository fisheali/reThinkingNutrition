function addCondition(data) {
  //log data for debug
  console.log(data);
  title = "Add Condition";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"Condition Name": "Dancer's Hip"}
    ]
//Potential Data Format Method
  val = []
  for (i = 0; i < sql_data.length; i++) {
    val.push({value : Object.values(sql_data[i])});
  }

  data = {keys : Object.keys(sql_data[0]), title : title, values: val};


  //Return [bool for success, bool for multiple records, data]
  return [true, data]
  //Database Call logic

  //Return failure or success
  return true;
};

function updateCondition(data) {
  //log data fro debug
  console.log(data);
  title = "Update Condition";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"Condition Name": "Dancer's Leg"}
    ];

//Potential Data Format Method
  val = []
  for (i = 0; i < sql_data.length; i++) {
    val.push({value : Object.values(sql_data[i])});
  }

  data = {keys : Object.keys(sql_data[0]), title : title, values: val};


  //Return [bool for success, bool for multiple records, data]
  return [true, true, data]
};

function removeCondition(data) {
  //log data fro debug
  console.log(data);
  title = "Remove Condition";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"Condition": "Dancer's Toe"}
    ];

//Potential Data Format Method
  val = []
  for (i = 0; i < sql_data.length; i++) {
    val.push({value : Object.values(sql_data[i])});
  }

  data = {keys : Object.keys(sql_data[0]), title : title, values: val};


  //Return [bool for success, bool for multiple records, data]
  return [true, true, data]
};

function getConditions(data) {
  //log data for debug
  console.log(data);
  title = "Conditions";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"Condition": "Dancer's Leg"},
      {"Condition": "Dancer's Brain"},
      {"Condition": "No Blood Pressure"}
    ]
//Potential Data Format Method
  val = []
  for (i = 0; i < sql_data.length; i++) {
    val.push({value : Object.values(sql_data[i])});
  }

  data = {keys : Object.keys(sql_data[0]), title : title, values: val};


  //Return [bool for success, bool for multiple records, data]
  return [true, data]
};

exports.addCondition = addCondition;
exports.updateCondition = updateCondition;
exports.removeCondition = removeCondition;
exports.getConditions = getConditions;
