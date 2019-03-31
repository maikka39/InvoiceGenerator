// Connect to the backend
const {
  remote
} = require('electron');

// Load the values script
const values = remote.require('./backend/values');

// Dictonary to convert month to Dutch string
let months = {
  1: "januari",
  2: "februari",
  3: "maart",
  4: "april",
  5: "mei",
  6: "juni",
  7: "juli",
  8: "augustus",
  9: "september",
  10: "oktober",
  11: "november",
  12: "december"
};

/**
 * Save data and go to the next screen.
 */
function nextScreen() {
  // Get the values of the fields
  let projectTitle = document.getElementById('project_title').value;
  let projectNumber = document.getElementById('project_number').value;
  let requestDate = document.getElementById('request_date').value;

  // If one or more of them are empty
  if (projectTitle === "" || projectNumber === "" || requestDate === "") {
    // Report to the user
    alert("Vul alstublieft alle gegevens in.");
    // And stop executing the rest of the code
    return;
  }

  // Send the values to the backend
  values.set('project_title', projectTitle);
  values.set('project_number', projectNumber);
  values.set('request_date', requestDate);

  values.set('request_date_text', parseInt(requestDate.split("-")[2]).toString() + months[parseInt(requestDate.split("-")[1])] + requestDate.split("-")[0]);

  // Redirect the user to the next page
  window.location.href = "template.html";
}
