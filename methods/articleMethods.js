function addArticle(data) {
  //log data for debug
  console.log(data);
  title = "Add Article";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data = [{
    "Article Name": "The 50 Best Supplements to Increase Your Dance Moves Prowess",
    "Author": "Calvin Todd",
    "Publication": "Dance Moves Weekly",
    "Website": "www.DMW.com"
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
}

function articlesByCondition(data) {
  //log data for debug
  console.log(data);
  title = "Articles for ".concat(data.cond);

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data = [{
      "Article Name": "The 50 Best Dance Moves For Heart Health",
      "Author": "Calvin Todd",
      "Publication": "Dance Moves Weekly",
      "Website": "www.DMW.com"
    },
    {
      "Article Name": "The 50 Best Dance Streches For Hair Growth",
      "Author": "Calvin Todd",
      "Publication": "Dance Moves Weekly",
      "Website": "www.DMW.com"
    },
    {
      "Article Name": "The 50 Top Dance Poses to Increase Blood Circulation",
      "Author": "Calvin Todd",
      "Publication": "Dance Moves Weekly",
      "Website": "www.DMW.com"
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

function articlesBySupplement(data) {
  //log data for debug
  console.log(data);
  title = "Articles for ".concat(data.art_from_supp);

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data = [{
      "Article Name": "The 50 Best Supplements to Increase Your Dance Moves Prowess",
      "Author": "Calvin Todd",
      "Publication": "Dance Moves Weekly",
      "Website": "www.DMW.com"
    },
    {
      "Article Name": "The 50 Best Supplements to Increase Your Flexibility For Dance Prowess",
      "Author": "Calvin Todd",
      "Publication": "Dance Moves Weekly",
      "Website": "www.DMW.com"
    },
    {
      "Article Name": "The 50 Best Supplements to Help With Injury Revcovery Because of Your Dance Moves Prowess",
      "Author": "Calvin Todd",
      "Publication": "Dance Moves Weekly",
      "Website": "www.DMW.com"
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

function updateArticle(data) {
  //log data fro debug
  console.log(data);
  title = "Update Article";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data = [{
    "Article": "Top 50 WORST Moves for Heart Health",
    "First namne": "Calvin",
    "Last Name": "Todd",
    "Publication": "Dance Moves Weekly",
    "Website": "www.DMW.com"
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

function removeArticle(data) {
  //log data fro debug
  console.log(data);
  title = "Remove Article";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data = [{
    "Article": "Top 50 Best Dance Moves for Heart Health",
    "First namne": "Calvin",
    "Last Name": "Todd",
    "Publication": "Dance Moves Weekly",
    "Website": "www.DMW.com"
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

exports.addArticle = addArticle;
exports.articlesByCondition = articlesByCondition;
exports.articlesBySupplement = articlesBySupplement;
exports.updateArticle = updateArticle;
exports.removeArticle = removeArticle;
