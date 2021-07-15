//Fill the Conditions drop down table with call to database
function fillCondList(condDropDown)
{
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

//Hide or show actions
function hideMenu(link_element){
  let divs = link_element.parentElement.getElementsByTagName("DIV");
  let style = window.getComputedStyle(divs[1]);
  let display = style.getPropertyValue('display');
  if ( display == 'none' ) {
    let select_element = divs[1].getElementsByClassName("cond_list");
    if ( select_element[0] ) {
      fillCondList(select_element[0]);
    }
    divs[1].style.display = 'inherit';
  }
  else {
    divs[1].style.display = 'none';
  }
}
