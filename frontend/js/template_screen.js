// Connect to the backend
const {
  remote
} = require('electron');

// Load the values script
const values = remote.require('./backend/values');

/**
 * Send a template to the backend.
 * @param {Object} template - The div of the template which should be used.
 */
function selectTemplate(el) {
  // Set the type of invoice
  values.set("invoice_type", el.getAttribute("name"));

  // Go to the next page
  window.location.href = "prologue.html";
}
