var databaseMethods = require('../methods/databaseMethods.js');

function addSupplement(data, pool, res) {
  //log data for debug
  sqlQuery = 'INSERT INTO Supplements (type, brand_id)\
  VALUES (?, ?)';

  pool.query(
      sqlQuery,
      [data.type, data.brand]
    )
    .then(response => {
      console.log(response);
      res.render('success');
    })
    .catch(err => {
      console.log(err);
      res.render('failure');
    })
};

function updateSupplement(data, pool, res) {

  action = '/updateSupplement';
  title = 'Update Supplement';

  if (data.updateConfirmed) {
    sqlQuery = "INSERT INTO Supplements (type, brand_id) VALUES (?, ?);"
    params = [data.type, data.brand];


    if (data.add_cond) {
      sqlQuery += "INSERT INTO Conditions_Supplements (supplement_id, condition_id)\
    VALUES (?, ?);"

      params.push(data.supplement_id);
      params.push(data.add_cond);
    }

    if (data.remove_cond) {
      sqlQuery += "DELETE FROM Conditions_Supplements WHERE supplement_id = ? AND condition_id = ?;";

      params.push(data.supplement_id);
      params.push(data.remove_cond);
    }

    pool.query(
        sqlQuery,
        params
      )
      .then(response => {
        res.render('success');
      })
      .catch(err => {
        console.log(err);
        res.render('failure');
      })
  }
else{
  console.log(data.supp);
  dropDowns = databaseMethods.dropDownList(pool, {
    supp_list: true,
    outer_supp_cond_list: true,
    inner_supp_cond_list: true,
    brand_list: true,
    spec_supp: true,
    supp_id: data.supp
  });
  dropDowns.then(response => {
      var returnData = {
        record: 0,
        title: title,
        action: action,
        outer_supp_cond_list: response[0],
        inner_supp_cond_list: response[1],
        brand_list: response[2],
        supplement: response[3],
      };
      let dat = response;
      //NOTE ABSENSE OF BRACKETS
      returnData.record = dat;
      res.render('update', returnData);
    })
    .catch(err => {
      console.log(err);
      res.render('failure');
    })
  }
};

function addBrand(data, pool, res) {
  //log data for debug
  sqlQuery = "INSERT INTO Brands (brand_name) VALUES (?);";

  pool.query(
      sqlQuery,
      [data.add_brand]
    )
    .then(response => {
      console.log(response);
      res.render('success');
    })
    .catch(err => {
      console.log(err);
      res.render('failure');
    })
};

function removeBrand(data, pool, res) {
  //log data fro debug
  sqlQuery = "DELETE FROM Brands WHERE brand_id = ?";

  pool.query(
      sqlQuery,
      [data.brand]
    )
    .then(response => {
      console.log(response);
      res.render('success');
    })
    .catch(err => {
      console.log(err);
      res.render('failure');
    })
};

function supplementsByCondition(data, pool, res) {
  //log data for debug
  action = '/supplementsByCondition';

  sqlQuery = "SELECT supplement_id AS 'Supplement ID', type AS 'Type', brand_name AS 'Brand'\
  FROM Supplements\
  LEFT JOIN Brands\
  USING (brand_id) \
  JOIN Conditions_Supplements\
  USING (supplement_id) \
  WHERE condition_id = ?;"

  pool.query(
      sqlQuery,
      [data.cond]
    )
    .then(response => {
      if (response.length > 0) {
        response.no_sub = true;
        returnData = databaseMethods.multipleRecords(response, action, data);
        pool.release;
        res.render('choices', returnData);
      } else {
        res.render('failure');
      }
    })
    .catch(err => {
      console.log(err);
      res.render('failure');
    })
};

function supplementsByBrand(data, pool, res) {
  action = '/supplementsByBrand';

  sqlQuery = "SELECT supplement_id AS 'Supplement ID', type AS 'Type', brand_name AS 'Brand'\
  FROM Supplements\
  JOIN Brands USING (brand_id)\
  WHERE brand_id = ?;"

  pool.query(
      sqlQuery,
      [Number(data.brand)]
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
};

exports.addSupplement = addSupplement;
exports.updateSupplement = updateSupplement;
exports.addBrand = addBrand;
exports.removeBrand = removeBrand;
exports.supplementsByCondition = supplementsByCondition;
exports.supplementsByBrand = supplementsByBrand;
