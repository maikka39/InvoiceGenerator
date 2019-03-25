// Connect to the backend
const {
  remote
} = require('electron');

// Load the values script
const values = remote.require('./backend/values');
const fs = remote.require('fs');

// Read the clients file
fs.readFile('./backend/clients.json', (err, data) => {
  // If there is an error, throw it
  if (err) throw err;
  // Parse the json file
  let clients = JSON.parse(data);

  // Get the dropdown menu
  let dropdown = document.getElementById('dropdown-menu4').children[0];

  // For every client in the json file
  for (let client in clients) {
    // Check if the client actually exists
    if (clients.hasOwnProperty(client)) {
      // Create a clone of the standard option
      let cln = dropdown.children[0].cloneNode(true);
      // Set the text to the client name
      cln.children[0].innerText = client;
      // Append the editted clone the the parent
      dropdown.appendChild(cln);
    }
  }

  // Remove the initial option
  dropdown.removeChild(dropdown.children[0]);

});

/**
 * Select a client from a previous invoice.
 * @param {string} name - The name of the preset company.
 */
function selectSavedClient(name) {
  // Read the clients file
  fs.readFile('./backend/clients.json', (err, data) => {
    // If there is an error, throw it
    if (err) throw err;
    // Parse the json file
    let clients = JSON.parse(data);

    // If the name is in the client list
    if (clients.hasOwnProperty(name)) {
      // Get the client object
      let client = clients[name]
      // Get all the fields
      let fields = document.getElementsByClassName('client_field');

      // For every field
      for (var i = 0; i < fields.length; i++) {
        // If the client has that property set
        if (client.hasOwnProperty(fields[i].name)) {
          // Set the correct value
          fields[i].value = client[fields[i].name];
        } else {
          // Otherwise make it blank
          fields[i].value = " ";
        }
      }
    } else {
      // If not, tell the user something went wrong
      alert("Sorry, er is iets mis gegaan.")
    }
  });
}

/**
 * Submit a form to the backend.
 * @param {Object} form - The form which should be submitted to the backend.
 */
function submitForm(el) {
  // Declare client_data
  let client_data = {};

  // Iterate through all the children of the form
  for (let i = 0; i < el.children.length; i++) {
    // If the element has the set class
    if (el.children[i].classList.contains('field')) {
      // Iterate through all the children of that class
      for (let j = 0; j < el.children[i].children.length; j++) {
        // If the element has the set class
        if (el.children[i].children[j].classList.contains('control')) {
          // Iterate through all the children of that class
          for (let k = 0; k < el.children[i].children[j].children.length; k++) {
            // If the element is of the type input
            if (el.children[i].children[j].children[k].tagName.toLowerCase() === "input") {
              // Set it to a variable
              let input = el.children[i].children[j].children[k];
              // And add it to the data
              client_data[input.name] = input.value;
            }
          };
        }
      };
    }
  };
  // Send the client data to the backend
  values.set("client", client_data);

  values.log();

  // Save as company
  fs.readFile('./backend/clients.json', (err, data) => {
    if (err) throw err;
    let clients = JSON.parse(data);

    clients[client_data.company] = client_data;

    let new_data = JSON.stringify(clients, null, 2);

    fs.writeFile('./backend/clients.json', new_data, (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  });

  // Prevent the form from submitting
  return false;
};
