//Fill the Conditions drop down table with call to database
function fillDropDownList(condDropDown)
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
    let cond_select_element = divs[1].getElementsByClassName("cond_list");
    let remove_cond_select_element = divs[1].getElementsByClassName("remove_cond_list");
    let brand_select_element = divs[1].getElementsByClassName("brand_list");
    let store_select_element = divs[1].getElementsByClassName("store_list");
    let remove_store_select_element = divs[1].getElementsByClassName("remove_store_list");
    //Check for conditions list
    if ( cond_select_element[0] ) {
      let options = cond_select_element[0].getElementsByTagName("OPTION")
      if ( !options[0] ) {
        fillDropDownList(cond_select_element[0]);
      }
    }
    //Remove_Conditions
    if ( remove_cond_select_element[0] ) {
      let remove_options = remove_cond_select_element[0].getElementsByTagName("OPTION")
      if ( !remove_options[0] ) {
        fillDropDownList(remove_cond_select_element[0]);
      }
    }
    //Check for Brand List
    if ( brand_select_element[0] ) {
      let brand_options = brand_select_element[0].getElementsByTagName("OPTION")
      if ( !brand_options[0] ) {
        fillDropDownList(brand_select_element[0]);
      }
    }
    //Check for Store list
    if ( store_select_element[0] ) {
      let store_options = store_select_element[0].getElementsByTagName("OPTION")
      if ( !store_options[0] ) {
        fillDropDownList(store_select_element[0]);
      }
    }
    //Check for removeStore list
    if ( remove_store_select_element[0] ) {
      let remove_store_options = remove_store_select_element[0].getElementsByTagName("OPTION")
      if ( !remove_store_options[0] ) {
        fillDropDownList(remove_store_select_element[0]);
      }
    }
    divs[1].style.display = 'inherit';
  }
  else {
    divs[1].style.display = 'none';
  }
}

//Add another condition field
function addAnother(label_element){
  let parent = label_element.parentElement;
  let select = document.createElement("select");
  if ( label_element.class = 'add_another' ){
    select.name = 'treat_cond';
  }
  else if (label_element.class = 'add_another_store' ) {
    select.name = "add_store"
  }
  else if (label_element.class = 'remove_another_store' ) {
    select.name = "remove_store"
  }
  else {
    select.name = 'remove_cond';
  }
  fillDropDownList(select);
  parent.insertBefore(select, label_element);
  label_element.insertAdjacentHTML('beforebegin', '<br>')
  select.insertAdjacentHTML('beforebegin', '<label>and </label>')
  select.insertAdjacentHTML('afterend', '<label class="remove" onclick="removeExtra(this)"> (-) </label>');
}

//Remove field
function removeExtra(element) {
  let cond_select = element.previousSibling;
  let label_element = cond_select.previousSibling;
  let br_element = element.nextSibling;

  label_element.remove();
  cond_select.remove();
  element.remove();
  br_element.remove();
}
