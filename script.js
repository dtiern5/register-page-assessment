const usersURL = "http://localhost:3000/users/";

/**
 * Fetches list of references, sorts them by last name, 
 * and appends them to Select Reference element
 */
const getReferrers = async () => {
  let referrerList = [];
  let select_elem = document.getElementById("selectID");
  fetch(usersURL)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      for (i in myJson) {
        referrerList.push(myJson[i]);
      }
      return referrerList;
    })
    .then((referrerList) => {
      referrerList.sort(sortByLast);
      referrerList.forEach((person) => {
        let opt = document.createElement("option");
        opt.text = person.name;
        opt.value = person.id;
        select_elem.appendChild(opt);
      });
    });
};

/**
 * Sorting logic for last name, then first name
 * @param {string} a Name a to compare
 * @param {string} b Name b to compare
 * @returns Negative, positive, equal if 'a' is less than, greater than, or equal to 'b'
 */
const sortByLast = (a, b) => {
  let nameA = a.name;
  let nameB = b.name;
  const splitA = nameA.split(" ");
  const splitB = nameB.split(" ");
  const lastA = splitA[splitA.length - 1];
  const lastB = splitB[splitB.length - 1];

  return lastA === lastB
    ? compareStrings(splitA[0], splitB[0])
    : compareStrings(lastA, lastB);
};

/**
 * Helper function for comparing strings
 * @param {String} a String a to compare
 * @param {String} b String b to compare
 * @returns Negative, positive, equal if 'a' is less than, greater than, or equal to 'b'
 */
const compareStrings = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/**
 * Checks validity of string entered in name field against regex expression
 * @param {string} name Name to be validated
 */
const checkName = (name) => {
  const regexName = /^[-A-Za-z ']{1,100}$/;
  const validName = name.match(regexName);

  if (validName == null && name != "") {
    console.log("invalid");
    document.getElementById("error-name").style.visibility = "visible";
  } else {
    document.getElementById("error-name").style.visibility = "hidden";
  }
};

/**
 * Checks validity of string entered in reference field against regex expression
 */
const checkReference = () => {
  const name = document.getElementById("reference-input-id").value;
  const regexName = /^[-A-Za-z ']{1,100}$/;
  const validName = name.match(regexName);

  if (validName == null && name != "") {
    console.log("invalid");
    document.getElementById("reference-error-id").style.visibility = "visible";
  } else {
    document.getElementById("reference-error-id").style.visibility = "hidden";
  }
};

/**
 * Checks validity of string entered in email field against regex expression
 * @param {string} email Email to be validated
 */
const checkEmail = (email) => {
  // regex taken from stack overflow
  const regexEmail =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const validEmail = email.toLowerCase().match(regexEmail);

  if (validEmail == null && email != "") {
    console.log("invalid");
    document.getElementById("error-email").style.visibility = "visible";
  } else {
    document.getElementById("error-email").style.visibility = "hidden";
  }
};

/**
 * Checks if Reference Select element is 'other', if so, creates new
 * fields and appends to parent
 * @param {string} val Value of Reference Select element
 */
const checkSelect = (val) => {
  let parent = document.getElementById("reference-div");
  if (val == "other") {
    // create input field
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "referrer");
    input.setAttribute("id", "reference-input-id");
    input.setAttribute("maxlength", "100");
    input.setAttribute("pattern", "[A-Za-z '-]{1,100}$");

    // create label
    let label = document.createElement("label");
    label.setAttribute("id", "reference-label-id");
    label.innerHTML = "Other Reference";

    // create potential error message
    let error = document.createElement("div");
    error.setAttribute("id", "reference-error-id");
    error.style.color = "red";
    error.style.visibility = "hidden";
    error.innerHTML = "Invalid Name";

    // event listener for valid input
    input.addEventListener("change", checkReference, false);

    // add all
    parent.appendChild(label);
    parent.appendChild(input);
    parent.appendChild(error);
  } else {
    // remove elements for entering other reference
    if (document.contains(document.getElementById("reference-input-id"))) {
      document.getElementById("reference-input-id").remove();
    }
    if (document.contains(document.getElementById("reference-label-id"))) {
      document.getElementById("reference-label-id").remove();
    }
    if (document.contains(document.getElementById("reference-error-id"))) {
      document.getElementById("reference-error-id").remove();
    }
  }
};