function addSupplement(data) {
  //log data for debug
  console.log(data);
  title = "Add Supplement";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"Supplement Name": "Magnesium", "Brand": "Mad Max"}
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

function updateSupplement(data) {
  //log data fro debug
  console.log(data);
  title = "Update Supplement";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"Supplement Name": "Magnesium", "Brand": "Sane Max"}
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

function addBrand(data) {
  //log data for debug
  console.log(data);
  title = "Add Brand";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"Brand Name": "Calvin's NOT so Curious Concoctions"}
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

function removeBrand(data) {
  //log data fro debug
  console.log(data);
  title = "Remove Brand";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"Brand": "Calvin's Curious Concoctions"}
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

function supplementsByCondition(data) {
  //log data for debug
  console.log(data);
  title = "Supplements for ".concat(data.treat_cond);

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"Supplement Type": "Magnesium", "Brand": "Mad Max"},
      {"Supplement Type": "Milkthistle", "Brand": "Calvin's NOT so Curious Concoctions"},
      {"Supplement Type": "Cat Toe Bean", "Brand": "Calvin's Curious Concoctions"}
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

function supplementsByBrand(data) {
  //log data for debug
  console.log(data);
  title = "Supplements from ".concat(data.update_supp_brand);

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"Supplement Type": "Magnesium", "Brand": "Mad Max"},
      {"Supplement Type": "Milkthistle", "Brand": "Mad Max"},
      {"Supplement Type": "Mummer's Miracle", "Brand": "Mad Max"}
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

exports.addSupplement = addSupplement;
exports.updateSupplement = updateSupplement;
exports.addBrand = addBrand;
exports.removeBrand = removeBrand;
exports.supplementsByCondition = supplementsByCondition;
exports.supplementsByBrand = supplementsByBrand;
