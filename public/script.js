//Fill the Conditions drop down table with call to database
var condDropDown = document.getElementById('cond_list');
if (condDropDown) {
  let option = document.createElement("option");
  option.text = "These";
  condDropDown.add(option);
  option = document.createElement("option");
  option.text = "Will";
  condDropDown.add(option);
  option = document.createElement("option");
  option.text = "Be";
  condDropDown.add(option);
  option = document.createElement("option");
  option.text = "Dynamically";
  condDropDown.add(option);
  option = document.createElement("option");
  option.text = "Pulled";
  condDropDown.add(option);
}
