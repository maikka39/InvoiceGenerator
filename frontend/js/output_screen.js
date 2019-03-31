// Connect to the backend
const {
  remote
} = require('electron');

// Get the values
const values = remote.require('./backend/values').get();


// Set the date variable
let date = new Date();

/**
 * Get the URL parameters
 * @return {Object} - The URL parameters
 */
function getParams() {
  // Create a dictionary for the parameters
  var params = {};
  // Create a parser element
  var parser = document.createElement('a');
  // Link it to this page
  parser.href = window.location.href;
  // Get the second substring
  var query = parser.search.substring(1);
  // Split it on the different variables
  var vars = query.split('&');
  // Loop through them
  for (var i = 0; i < vars.length; i++) {
    // Split the variable at the '=' sign
    var pair = vars[i].split('=');
    // Create an entry in the params variable for the variable
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  // Send back the parameters
  return params;
};

/**
 * Upload a file to the user.
 * @param {string} link - The link to the file which should be downloaded.
 * @param {string} filename - The name with which the file should be saved.
 */
function download(link, filename) {
  // Create an anchor element
  var element = document.createElement('a');
  // Point the href to the link
  element.setAttribute('href', link);
  // Set the download attribute so it will download and not open
  // Also, set it to the filename which is then automatically filled in when the user downloads the file
  element.setAttribute('download', filename);

  // Hide the element so the user doesn't see it
  element.style.display = 'none';
  // Add it to the body of the html
  document.body.appendChild(element);

  // Simulate a click on the element
  element.click();

  // Then remove it
  document.body.removeChild(element);
}

/**
 * Upload the invoice to the user
 */
function downloadInvoice() {
  // Upload the file to the user
  // window.location.href = "../output/" + getParams()["invoiceFilename"];
  download("../output/" + getParams()["invoiceFilename"], "offerte_" + date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + values["client"]["company"].replace(/[^a-zA-Z0-9]/g, '_') + ".docx")

}
