function addConsultation(data) {
  //log data for debug
  console.log(data);

  //Database Call logic

  //Return failure or success
  return true;
};

function upcomingConsultations(data) {
  //log data fro debug
  console.log(data);
  title = "Upcoming Consultations";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  if (data.radio_client == 'all_clients')
  {
    sql_data =
      [
        {"first name": "Calvin", "last namne": "Todd", "phone": "703-282-6899", "email": "toddcal@oregonstate.edu", "date": "May 3, 1988"},
        {"first name": "Michelle", "last namne": "Gomez", "phone": "1800AWESOME", "email": "MishSquish@notreal.com", "date": "may 4, 1989"}
      ];
  }
  else {
    sql_data =
      [
        {"first name": "Calvin", "last namne": "Todd", "phone": "703-282-6899", "email": "toddcal@oregonstate.edu", "date": "May 3, 1988"},
        {"first name": "Calvin", "last namne": "Todd", "phone": "703-282-6899", "email": "toddcal@oregonstate.edu", "date": "may 4, 1989"}
      ];
  }

//Potential Data Format Method
  val = []
  for (i = 0; i < sql_data.length; i++) {
    val.push({value : Object.values(sql_data[i])});
  }

  data = {keys : Object.keys(sql_data[0]), title : title, values: val};


  //Return [bool for success, bool for multiple records, data]
  return [true, data]
}

function updateConsultation(data) {
  //log data fro debug
  console.log(data);
  title = "Update Client Consultation";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"first name": "Calvin", "last namne": "Todd", "phone": "703-282-6899", "email": "toddcal@oregonstate.edu", "date": "april 5th 2011", "time": "4:20", "completed" : true, "paid" : false, "notes" : "Calvin made great progress today, we are all very proud of him"}
    ];

//Potential Data Format Method
  val = []
  for (i = 0; i < sql_data.length; i++) {
    val.push({value : Object.values(sql_data[i])});
  }

  data = {keys : Object.keys(sql_data[0]), title : title, values: val};


  //Return [bool for success, bool for multiple records, data]
  return [true, true, data]
}

function deleteConsultation(data) {
  //log data fro debug
  console.log(data);
  title = "Remove Consultation";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
  [
    {"first name": "Calvin", "last namne": "Todd", "phone": "703-282-6899", "email": "toddcal@oregonstate.edu", "date": "Febuary 3rd 1955", "time": "5:30"}
  ];

//Potential Data Format Method
  val = []
  for (i = 0; i < sql_data.length; i++) {
    val.push({value : Object.values(sql_data[i])});
  }

  data = {keys : Object.keys(sql_data[0]), title : title, values: val};


  //Return [bool for success, bool for multiple records, data]
  return [true, true, data]
}

function makeRecommendation(data) {
  //log data for debugging
  console.log(data);
  title = "Make Reccomendation";

  //SQL call for recceomendations
  if (data.choices == 'true') {
    sql_data = [{reccomendations : [{"articles" : ["art1 ", "art2", "art3"], "supplements" : ["supp1", "supp2", "supp3"]}]}];
    data = {keys : Object.keys(sql_data[0].reccomendations[0]), title : title, articles: Object.values(sql_data[0].reccomendations[0].articles), supplements:  Object.values(sql_data[0].reccomendations[0].supplements), choices : data.choices};
  }
  else {
    sql_data = [data];
    val = []
    for (i = 0; i < sql_data.length; i++) {
      val.push({value : Object.values(sql_data[i])});
    }

    data = {keys : Object.keys(sql_data[0]), title : title, values: val, choices : data.choices};
  }

  //Data Format


  //Return [bool for success, data]
  return [true, data]
}

function viewReccomendations(data) {
  //log data fro debug
  console.log(data);
  title = "View Reccomendations";

  //Database call logic

  //Logic to check if there are multiple records returned

  //placeholder data
  sql_data =
    [
      {"first name": "Calvin", "last namne": "Todd", "Reccomended Articles": "[Article 1, Articles 2, Article 3]"},
      {"first name": "Calvin", "last namne": "Todd", "Reccomended Supplements": "[Supplement 1, Supplement 2, Supplement 3]"}
    ];

//Potential Data Format Method
  val = []
  for (i = 0; i < sql_data.length; i++) {
    val.push({value : Object.values(sql_data[i])});
  }

  data = {keys : Object.keys(sql_data[0]), title : title, values: val};


  //Return [bool for success, bool for multiple records, data]
  return [true, true, data]
}

function removeReccomendations(data) {
  //log data for debugging
  console.log(data);
  title = "Remove Reccomendation";

  //SQL call for recceomendations
  if (data.choices == 'true') {
    sql_data = [{reccomendations : [{"articles" : ["art1 ", "art2", "art3"], "supplements" : ["supp1", "supp2", "supp3"]}]}];
    data = {title: title, keys : Object.keys(sql_data[0].reccomendations[0]), title : title, articles: Object.values(sql_data[0].reccomendations[0].articles), supplements:  Object.values(sql_data[0].reccomendations[0].supplements), choices : data.choices};
  }
  else {
    sql_data = [data];
    val = []
    for (i = 0; i < sql_data.length; i++) {
      val.push({value : Object.values(sql_data[i])});
    }

    data = {keys : Object.keys(sql_data[0]), title : title, values: val, choices : data.choices};
  }

  //Data Format


  //Return [bool for success, data]
  return [true, data]
}
exports.addConsultation = addConsultation;
exports.upcomingConsultations = upcomingConsultations;
exports.updateConsultation = updateConsultation;
exports.deleteConsultation = deleteConsultation;
exports.makeRecommendation = makeRecommendation;
exports.viewReccomendations = viewReccomendations;
exports.removeReccomendations = removeReccomendations;
