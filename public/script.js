//Hide or show actions
function hideMenu(link_element) {
  let divs = link_element.parentElement.getElementsByTagName("DIV");
  let style = window.getComputedStyle(divs[1]);
  let display = style.getPropertyValue('display');
  if (display == 'none') {
    divs[1].style.display = 'inherit';
  } else {
    divs[1].style.display = 'none';
  }
}

//Add another condition field
function addAnother(label_element) {
  let parent = label_element.parentElement;
  let select = document.createElement("select");
  if (label_element.class = 'add_another') {
    select.name = 'treat_cond';
  } else if (label_element.class = 'add_another_store') {
    select.name = "add_store"
  } else if (label_element.class = 'remove_another_store') {
    select.name = "remove_store"
  } else {
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
