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
    .then(response => {
      article_id = response.insertId;
      sqlQuery = "";
      params = [];

      if (data.cond) {
        sqlQuery += 'INSERT INTO Conditions_Articles (condition_id, article_id)\
      VALUES (?, ?);';
        params.push(data.cond, article_id);
      }
      if (data.supp) {
        sqlQuery += 'INSERT INTO Supplements_Articles (supplement_id, article_id)\
      VALUES (?, ?);';
        params.push(data.supp, article_id);
      }
      if (sqlQuery) {
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
            res.render('failure');
          })
      }
    })
    .catch(err => {
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
    .then(response => {
      response.no_sub = true;
      returnData = databaseMethods.multipleRecords(response, action, data);
      console.log(returnData);
      pool.release;
      res.render('choices', returnData);
    })
    .catch(err => {
      console.log(err);
      res.render('failure');
    })
}

function articlesBySupplement(data, pool, res) {
  //log data for debug
  action = './articlesBySupplement'
  console.log(data);
  sqlQuery = "SELECT article_id AS 'Article ID', title AS 'Title', author AS 'Author', publication AS 'Publication', website AS 'Website'\
  FROM Supplements s\
  JOIN Supplements_Articles sa\
  USING (supplement_id)\
  JOIN Articles a\
  USING (article_id)\
  WHERE supplement_id = ?;"

  pool.query(
      sqlQuery,
      [data.supp]
    )
    .then(response => {
      response.no_sub = true;
      returnData = databaseMethods.multipleRecords(response, action, data);
      pool.release;
      res.render('choices', returnData);
    })
    .catch(err => {
      console.log(err);
      res.render('failure');
    })
}

function updateArticle(data, pool, res) {
  //Select Article to Update
  action = './updateArticle';
  title = 'Update an Article';

  //Do partial matching on title/author
  if (data.updateConfirmed) {
    console.log(data);
    sqlQuery = "UPDATE Articles\
    SET title = ?, publish_date = ?, publication = ?, author = ?, website = ?\
    WHERE article_id = ?;"
    params = [data.title, data.date, data.publication, data.author, data.website, data.article_id]

    if (data.remove_cond) {
      sqlQuery += "DELETE FROM Conditions_Articles WHERE article_id = ? AND condition_id = ?;";
      params.push(data.article_id);
      params.push(data.remove_cond);
    }

    if (data.add_cond) {
      sqlQuery += "INSERT INTO Conditions_Articles (article_id, condition_id) VALUES (?, ?);";
      params.push(data.article_id);
      params.push(data.add_cond);
    }

    if (data.remove_supp) {
      sqlQuery += "DELETE FROM Supplements_Articles WHERE article_id = ? AND supplement_id = ?;";
      params.push(data.article_id);
      params.push(data.remove_supp);
    }

    if (data.add_supp) {
      sqlQuery += "INSERT INTO Supplements_Articles (article_id, supplement_id) VALUES (?, ?);";
      params.push(data.article_id);
      params.push(data.add_supp);
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
        res.render('failure');
      });
    return;
  }

  if (!data.article_id && !data.updateConfirmed) {
    searchArray = data.search.split(' ');
    for (let i = 0; i < searchArray.length; i++) {
      searchArray[i] = ' OR title LIKE  \'%' + searchArray[i] + '%\' OR author LIKE \'%' + searchArray[i] + '%\' OR author LIKE \'' + searchArray[i] + '%\'  OR author LIKE \'%' + searchArray[i] + '\'OR title LIKE \'' + searchArray[i] + '%\'  OR title LIKE \'%' + searchArray[i] + '\'';
    }
  }

  sqlQuery = "SELECT article_id AS 'Article ID', title AS 'Title', author AS 'Author', publication AS 'Publication', website AS 'Website'\
  FROM Articles\
  WHERE article_id = ? OR title = ? OR author = ?";

  if (!data.article_id && !data.updateConfirmed) {
    for (let i = 0; i < searchArray.length; i++) {
      sqlQuery += searchArray[i];
    }
    data.article_id = "";
  }

  sqlQuery += ';';

  pool.query(
      sqlQuery,
      [data.article_id, data.search, data.search]
    )
    .then(response => {
      if (!data.article_id) {
        returnData = databaseMethods.multipleRecords(response, action, data);
        pool.release;
        res.render('choices', returnData);
      } else {
        sqlQuery = "SELECT * FROM Articles WHERE article_id = ?";
        dropDowns = databaseMethods.dropDownList(pool, {
          outer_supp_list: true,
          inner_supp_list: true,
          outer_cond_list: true,
          inner_cond_list: true,
          article_id: data.article_id,
          spec_article: true
        });
        dropDowns.then(response => {
            var returnData = {
              record: 0,
              title: title,
              action: action,
              inner_supp: response[0],
              outer_supp: response[1],
              inner_cond: response[2],
              outer_cond: response[3],
              article: response[4]
            };
            let dat = response;
            //NOTE ABSENSE OF BRACKETS
            returnData.record = dat;
            console.log(returnData);
            res.render('update', returnData);
          })
          .catch(err => {
            console.log(err);
            res.render('failure');
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.render('failure');
    })
}

function removeArticle(data, pool, res) {
  //log data fro debug
  console.log(data);
  title = "Remove Article";
  action = '/removeArticle';

  if (!data.article_id) {
    searchArray = data.search.split(' ');
    for (let i = 0; i < searchArray.length; i++) {
      searchArray[i] = ' OR title LIKE  \'%' + searchArray[i] + '%\' OR author LIKE \'%' + searchArray[i] + '%\' OR author LIKE \'' + searchArray[i] + '%\'  OR author LIKE \'%' + searchArray[i] + '\'OR title LIKE \'' + searchArray[i] + '%\'  OR title LIKE \'%' + searchArray[i] + '\'';
    }
  }

  sqlQuery = "SELECT article_id AS 'Article ID', title AS 'Title', author AS 'Author', publication AS 'Publication', website AS 'Website'\
  FROM Articles\
  WHERE article_id = ? OR title = ? OR author = ?";

  if (!data.article_id) {
    for (let i = 0; i < searchArray.length; i++) {
      sqlQuery += searchArray[i];
    }
    data.article_id = "";
  }

  sqlQuery += ';';

  pool.query(
      sqlQuery,
      [data.article_id, data.search, data.search]
    )
    .then(response => {
      if (!data.article_id) {
        returnData = databaseMethods.multipleRecords(response, action, data);
        pool.release;
        res.render('choices', returnData);
      } else {
        sqlQuery = "DELETE FROM Articles WHERE article_id = ?;";

        pool.query(
            sqlQuery,
            [data.article_id]
          )
          .then(response => {
            console.log(response);
            res.render('success');
          })
          .catch(err => {
            console.log(err);
            res.render('failure');
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.render('failure');
    })
}

exports.addArticle = addArticle;
exports.articlesByCondition = articlesByCondition;
exports.articlesBySupplement = articlesBySupplement;
exports.updateArticle = updateArticle;
exports.removeArticle = removeArticle;
