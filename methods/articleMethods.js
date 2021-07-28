var databaseMethods = require('../methods/databaseMethods.js');

function addArticle(data, pool, res) {
  //log data for debug
  console.log(data);
  title = "Add Article";
  sqlQuery = "INSERT INTO Articles (title, author, publication, publish_date, website)\
  VALUES (?, ?, ?, ?, ?);",
  params = [data.title, data.author, data.publication, data.date, data.website];

  pool.query(
    sqlQuery,
    [data.title, data.author, data.publication, data.date, data.website]
  )
  .then( response => {
    article_id = response.insertId;
    sqlQuery = "";
    params = [];

    if (data.cond){
      sqlQuery += 'INSERT INTO Conditions_Articles (condition_id, article_id)\
      VALUES (?, ?);';
      params.push(data.cond, article_id);
    }
    if (data.supp){
      sqlQuery += 'INSERT INTO Supplements_Articles (supplement_id, article_id)\
      VALUES (?, ?);';
      params.push(data.supp, article_id);
    }
    if (sqlQuery) {
      pool.query(
        sqlQuery,
        params
      )
      .then( response => {
        console.log(response);
        res.render('success');
      })
      .catch( err => {
        console.log(err);
        res.render('failure');
      })
    }
  })
  .catch( err => {
    console.log(err);
    res.render('failure');
  })
}

function articlesByCondition(data, pool, res) {
  //log data for debug
  action = './articlesByCondition'
  console.log(data);
  sqlQuery = "SELECT article_id AS 'Article ID', title AS 'Title', author AS 'Author', publication AS 'Publication', website AS 'Website'\
  FROM Conditions c\
  JOIN Conditions_Articles ca\
  USING (condition_id)\
  JOIN Articles a\
  USING (article_id)\
  WHERE condition_id = ?;"

  pool.query(
    sqlQuery,
    [data.cond]
  )
  .then( response => {
    response.no_sub = true;
    returnData = databaseMethods.multipleRecords(response, action, data);
    console.log(returnData);
    pool.release;
    res.render('choices', returnData);
  })
  .catch( err => {
    console.log(err);
    res.render('failure');
  })
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
