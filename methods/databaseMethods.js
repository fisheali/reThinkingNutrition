const mariadb = require('mariadb');
var dbconn = require('./dbconn.json');

function returnPool() {
  pool = mariadb.createPool({
  host: dbconn.host,
  user:dbconn.user,
  password: dbconn.password,
  database: dbconn.database,
  connectionLimit: 5,
  multipleStatements: true
  })
  return pool;
};

function multipleNameRecords (res, action, data) {
      val = [];
      for (let i = 0; i < res.length; i++)
      {
        val.push({value : Object.values(res[i])});
      }
      returnData = {name : res[0]['First Name'] + " " + res[0]['Last Name'],
       keys : Object.keys(res[0]), values : val, consultations : 0,
      action : action, supplements : 0, articles : 0, date: 0, time: 0,
      time_frame : 0, radio_client : 0};

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

      return returnData;
};

function singleRecord (res, title) {
  val = [];
  for (let i = 0; i < res.length; i++)
  {
    val.push({value : Object.values(res[i])});
  }
  returnData = {title : title,
   keys : Object.keys(res[0]), values : val};
  return returnData;
};


exports.returnPool = returnPool;
exports.multipleNameRecords = multipleNameRecords;
exports.singleRecord = singleRecord;
