const mariadb = require('mariadb');
var dbconn = require('./dbconn.json');

function returnPool() {
  pool = mariadb.createPool({
    host: dbconn.host,
    user: dbconn.user,
    password: dbconn.password,
    database: dbconn.database,
    connectionLimit: 5,
    multipleStatements: true
  })
  return pool;
};

function multipleRecords(res, action, data) {
  val = [];
  for (let i = 0; i < res.length; i++) {
    val.push({
      value: res[i]
    });
  }
  returnData = {
    keys: Object.keys(res[0]),
    values: val,
    consultations: 0,
    action: action,
    supplements: 0,
    articles: 0,
    date: 0,
    time: 0,
    time_frame: 0,
    radio_client: 0,
    cosnultation_id: 0,
    no_sub: 0,
    search: 0
  };

  if (data["consultations"]) {
    let consulData = data["consultations"];
    returnData.consultations = consulData;
  }

  if (data["supplements"]) {
    let suppData = data["supplements"];
    returnData.supplements = suppData;
  }

  if (data["articles"]) {
    let articleData = data["articles"];
    returnData.articles = articleData;
  }

  if (data["date"]) {
    let dateData = data["date"];
    returnData.date = dateData;
  }

  if (data["time"]) {
    let timeData = data["time"];
    returnData.time = timeData;
  }

  if (data["time_frame"]) {
    let timeFData = data["time_frame"];
    returnData.time_frame = timeFData;
  }

  if (res["no_sub"]) {
    let subData = res["no_sub"];
    returnData.no_sub = subData;
  }

  if (data["radio_client"]) {
    let radioData = data["radio_client"];
    returnData.radio_client = radioData;
  }

  if (data["Consultation ID"]) {
    let conData = data["Consultation ID"];
    returnData.consultation_id = conData;
  }

  if (data["search"]) {
    let sData = data["search"];
    returnData.search = sData;
  }

  return returnData;
};


function multipleNameRecords(res, action, data) {
  val = [];
  for (let i = 0; i < res.length; i++) {
    val.push({
      value: res[i]
    });
  }
  returnData = {
    name: res[0]['First Name'] + " " + res[0]['Last Name'],
    keys: Object.keys(res[0]),
    values: val,
    consultations: 0,
    action: action,
    supplements: 0,
    articles: 0,
    date: 0,
    time: 0,
    time_frame: 0,
    radio_client: 0,
    cosnultation_id: 0
  };

  if (data["consultations"]) {
    let consulData = data["consultations"];
    returnData.consultations = consulData;
  }

  if (data["supplements"]) {
    let suppData = data["supplements"];
    returnData.supplements = suppData;
  }

  if (data["articles"]) {
    let articleData = data["articles"];
    returnData.articles = articleData;
  }

  if (data["date"]) {
    let dateData = data["date"];
    returnData.date = dateData;
  }

  if (data["time"]) {
    let timeData = data["time"];
    returnData.time = timeData;
  }

  if (data["time_frame"]) {
    let timeFData = data["time_frame"];
    returnData.time_frame = timeFData;
  }

  if (data["radio_client"]) {
    let radioData = data["radio_client"];
    returnData.radio_client = radioData;
  }

  if (data["Consultation ID"]) {
    let conData = data["Consultation ID"];
    returnData.consultation_id = conData;
  }

  if (data["search"]) {
    let sData = data["search"];
    returnData.search = sData;
  }

  return returnData;
};

function singleRecord(res, title) {
  val = [];
  for (let i = 0; i < res.length; i++) {
    val.push({
      value: Object.values(res[i])
    });
  }
  returnData = {
    title: title,
    keys: Object.keys(res[0]),
    values: val
  };
  return returnData;
};

async function dropDownList(pool, params) {
  //Function to return a condition list based on params
  //Build Query string
  sqlQuery = "";
  searchList = [];

  if (params.inner_client_list) {
    sqlQuery += "SELECT condition_id, condition_name\
    FROM Conditions\
    JOIN Clients_Conditions\
    USING (condition_id)\
    WHERE client_id = ?;"

    searchList.push(params.client_id)
  }

  if (params.outer_client_list) {
    sqlQuery += "SELECT DISTINCT c.condition_id, c.condition_name\
    FROM Conditions c\
    LEFT JOIN (SELECT client_id, condition_id\
    FROM Clients_Conditions\
    WHERE client_id = ?) cc\
    ON (c.condition_id = cc.condition_id)\
    WHERE cc.client_id IS NULL;"

    searchList.push(params.client_id)
  }

  if (params.inner_supp_list) {
    sqlQuery += "SELECT supplement_id, type, brand_name\
    FROM Supplements\
    LEFT JOIN Brands\
    USING (brand_id)\
    JOIN Supplements_Articles\
    USING (supplement_id)\
    WHERE article_id = ?;"

    searchList.push(params.article_id)
  }

  if (params.outer_supp_list) {
    sqlQuery += "SELECT DISTINCT s.supplement_id, s.type, b.brand_name\
    FROM Supplements s\
    LEFT JOIN Brands b\
    USING (brand_id)\
    LEFT JOIN (SELECT supplement_id, article_id\
    FROM Supplements_Articles\
    WHERE article_id = ?) sa\
    ON (s.supplement_id = sa.supplement_id)\
    WHERE sa.article_id IS NULL;"

    searchList.push(params.article_id)
  }

  if (params.inner_cond_list) {
    sqlQuery += "SELECT condition_id, condition_name\
    FROM Conditions\
    JOIN Conditions_Articles\
    USING (condition_id)\
    WHERE article_id = ?;"

    searchList.push(params.article_id)
  }

  if (params.outer_cond_list) {
    sqlQuery += "SELECT DISTINCT c.condition_id, c.condition_name\
    FROM Conditions c\
    LEFT JOIN (SELECT article_id, condition_id\
    FROM Conditions_Articles\
    WHERE article_id = ?) ca\
    ON (c.condition_id = ca.condition_id)\
    WHERE ca.article_id IS NULL;"

    searchList.push(params.article_id)
  }

  if (params.full_list) {
    sqlQuery += "SELECT *\
    FROM Conditions;"
  }

  if (params.spec_article) {
    sqlQuery += "SELECT * FROM Articles WHERE article_id = ?;";

    searchList.push(params.article_id);
  }

  return pool.query(
    sqlQuery,
    searchList
  )

}

async function nameRecords(pool, data) {
  //First call to check # of name Records
  sqlQuery = "SELECT client_id AS 'Client ID', fname AS 'First Name', lname AS 'Last Name', phone AS 'Phone Number', email AS 'Email Address', address AS 'Street Address', city AS 'City' \
  FROM Clients cl\
  WHERE (fname = ?\
    AND lname = ?)\
    OR (client_id = ?);";

  return pool.query(
    sqlQuery,
    [data.fname, data.lname, data.client_id]
  );
};

async function addDropDowns(pool) {
  //Get Condition records
  return pool.query("SELECT * FROM Conditions;SELECT supplement_id, type, brand_name FROM Supplements LEFT JOIN Brands USING (brand_id);");
}

function formatDropDowns(renderData, conditions) {
  //Build Conditions Tag

  supTagRequired = '<select id="supp" name="supp" required><option value="">';
  supTag = '<select id="supp" name="supp"><option value=""></option>';
  requiredTag = '<select id="cond" name="cond" required>';
  tag = '<select id="cond" name="cond"><option value=""></option>';
  for (let i = 0; i < conditions[0].length; i++) {
    part = '<option value="' + conditions[0][i].condition_id + '">' + conditions[0][i].condition_name + '</option>';
    requiredTag += part;
    tag += part;
  }
  for (let i = 0; i < conditions[1].length; i++) {
    let brandName = (conditions[1][i].brand_name != null) ? conditions[1][i].brand_name + ': ' : '';
    part = '<option value="' + conditions[1][i].supplement_id + '">' + brandName + conditions[1][i].type + '</option>';
    supTagRequired += part;
    supTag += part;
  }
  supTagRequired += '</select>';
  supTag += '</select>';
  requiredTag += '</select>';
  tag += '</select>';

  //Replace in renderData
  for (let i = 0; i < renderData.actions.length; i++) {
    renderData.actions[i].action[0].input = renderData.actions[i].action[0].input.replace('<select class="cond_list" name="cond" required></select>', requiredTag);
    renderData.actions[i].action[0].input = renderData.actions[i].action[0].input.replace('<select class="cond_list" name="cond"></select>', tag);
    renderData.actions[i].action[0].input = renderData.actions[i].action[0].input.replace('<input type="text" id="supp" name="supp" value="" placeholder="Supplement Type" required>', supTagRequired);
    renderData.actions[i].action[0].input = renderData.actions[i].action[0].input.replace('<input type="text" id="supp" name="supp" value="" placeholder="Supplement Type">', supTag);
  }
  return renderData;
};


exports.returnPool = returnPool;
exports.multipleNameRecords = multipleNameRecords;
exports.singleRecord = singleRecord;
exports.dropDownList = dropDownList;
exports.nameRecords = nameRecords;
exports.multipleRecords = multipleRecords;
exports.addDropDowns = addDropDowns;
exports.formatDropDowns = formatDropDowns;
