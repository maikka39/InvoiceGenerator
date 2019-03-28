// Connect to the backend
const {
  remote
} = require('electron');

// Load the values script
const values = remote.require('./backend/values');
const fs = remote.require('fs');

// Read the clients file
fs.readFile('./backend/databases/clients.json', (err, data) => {
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

// Read the tenets file in a synchronous manner
let data = fs.readFileSync('./backend/databases/tenets.json');
// Parse the data and get the dynamic part
let tenets = JSON.parse(data)["Dynamisch"];
// Get the template tenet element
let tenetel = document.getElementById('tenet');

// Declare some variables
let lcln;
let lclnl;

// Iterate through all the tenets
for (let tenet in tenets) {
  // If the tenet actually exists
  if (tenets.hasOwnProperty(tenet)) {
    // Create a clone of the standard product
    tcln = tenetel.cloneNode(true);
    // Create a clone of its label
    tclnl = tenetel.nextElementSibling.cloneNode(true);
    // Set the name of the input
    tcln.name = tenet;
    // Set the text of its corresponding label
    tclnl.innerText = tenet;
    // Append the editted clone the the parent
    tenetel.parentNode.appendChild(tcln);
    // Append the editted clone's label the the parent
    tenetel.parentNode.appendChild(tclnl);
  }
}

// Remove the initial tenet element and its label
tenetel.parentNode.removeChild(tenetel.nextElementSibling);
tenetel.parentNode.removeChild(tenetel);


// Read the clients file
fs.readFile('./backend/databases/products.json', (err, data) => {
  // If there is an error, throw it
  if (err) throw err;
  // Parse the json file and grab the products
  let products = JSON.parse(data);

  // Get the popup_products menu
  let popupProducts = document.getElementById('popup_products');

  // For every product in the JSON file
  for (let category in products) {
    if (products.hasOwnProperty(category)) {
      // Copy the template category header
      let ccln = popupProducts.children[0].cloneNode(true);
      // Set the text of it to the name of the category
      ccln.innerText = category;
      // Add the category header to the popupProducts
      popupProducts.appendChild(ccln);
      for (let product in products[category]) {
        if (products[category].hasOwnProperty(product)) {
          // Create a clone of the standard product
          let pcln = popupProducts.children[1].cloneNode(true);
          // Set the text to the product name
          pcln.children[0].children[0].innerText = product;
          // Append the editted clone the the parent
          popupProducts.appendChild(pcln);
        }
      }
    }
  }

  // Remove the initial option
  popupProducts.removeChild(popupProducts.children[0]);
  popupProducts.removeChild(popupProducts.children[0]);

});








// Get the list with products
let productList = document.getElementById('product_list');

// Declare the clone variable
let cln;

// Create 49 extra hidden products
for (let i = 0; i < 49; i++) {
  // Create a clone of the standard product
  cln = productList.children[0].cloneNode(true);
  // // Show the product
  // cln.classList.remove('hidden');
  // Append the editted clone the the parent
  productList.appendChild(cln);
}

// Give out ids
setIDs();

// Make all accordions work with the bulma library
let accordions = bulmaAccordion.attach();

/**
 * Select a client from a previous invoice.
 * @param {string} name - The name of the preset company.
 */
function selectSavedClient(name) {
  // Read the clients file
  fs.readFile('./backend/databases/clients.json', (err, data) => {
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
      for (let i = 0; i < fields.length; i++) {
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
  // Declare clientData
  let clientData = {};

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
              if (input.value == "" && input.name !== "insertion") {
                alert("Vul alstublieft alle klantgegevens in.");
                return "not_all_fields";
              }
              clientData[input.name] = input.value;
            }
          };
        }
      };
    }
  };
  // Send the client data to the backend
  values.set("client", clientData);

  // Save as company
  fs.readFile('./backend/databases/clients.json', (err, data) => {
    // If there is an error, throw it
    if (err) throw err;
    // Parse the read JSON data
    let clients = JSON.parse(data);

    // Create a new entry, or modify an existing one, with the filled in data
    clients[clientData.company] = clientData;

    // Convert back to JSON
    let newData = JSON.stringify(clients, null, 2);

    // Write it to the file
    fs.writeFile('./backend/databases/clients.json', newData, (err) => {
      // If there is an error, throw it
      if (err) throw err;
    });
  });

  // Prevent the form from submitting
  return false;
};

/**
 * Choose a product from a popup window .
 */
function chooseProduct() {
  let popup_screen = document.getElementById('product_popup');

  popup_screen.classList.add('is-active');
}

/**
 * Add a new product to a list.
 * @param {Object} el - The element which was selected in the popup window.
 */
function addProduct(el) {
  let popup_screen = document.getElementById('product_popup');

  if (popup_screen.classList.contains('is-active')) {
    popup_screen.classList.remove('is-active')
  }

  // Get all the accordions
  let productList = document.querySelectorAll('.accordion');

  // Loop through them
  for (let i = 0; i < productList.length; i++) {
    // If it is hidden
    if (productList[i].classList.contains('hidden')) {
      // Show it
      productList[i].classList.remove('hidden');
      // Mark it as 'used for data'
      productList[i].classList.add('used_for_data');
      // Change the title to the selected item
      productList[i].firstElementChild.children[1].innerText = el.firstElementChild.innerText
      // Stop
      return;
    }
  }
}

/**
 * Remove a product from a list .
 * @param {Object} product - The product which should be removed.
 */
function removeProduct(product) {
  // Get the product element
  let correspondingAccordion = product.parentElement.parentElement;
  // If the product is opened
  if (correspondingAccordion.classList.contains('is-active')) {
    // Close the product
    correspondingAccordion.classList.remove('is-active');
  }
  // Make it permanently hidden
  correspondingAccordion.classList.add('perm_hidden');
  // Mark it as not used
  correspondingAccordion.classList.remove('used_for_data');
}

/**
 * Saves all the values to the backend and redirects user to the next page.
 */
function saveOptions() {
  if (submitForm(document.getElementById('setCustomer')) === "not_all_fields") {
    return;
  }

  let products = [];

  let usedProducts = document.getElementsByClassName('used_for_data');

  for (let i = 0; i < usedProducts.length; i++) {
    let product = {};

    let productName = usedProducts[i].firstElementChild.children[1].innerText;
    let productAmount = usedProducts[i].lastElementChild.firstElementChild.firstElementChild.firstElementChild.lastElementChild.firstElementChild.value;

    if (productAmount === "") {
      alert("Vul alstublieft alle hoeveelheden in.");
      return;
    }

    product["name"] = productName;
    product["amount"] = productAmount;
    product["tenets"] = {};

    let checkboxes = usedProducts[i].lastElementChild.firstElementChild.firstElementChild;

    for (let i = 0; i < checkboxes.children.length; i++) {
      if (checkboxes.children[i].tagName.toLowerCase() === "input") {
        product["tenets"][checkboxes.children[i].nextElementSibling.innerText] = checkboxes.children[i].checked;
      }
    }

    products.push(product);
  }

  values.set("products", products);

  // Go to the next page
  window.location.href = "generate.html";
}

/**
 * Set ids for all DOM elements with the class setID.
 */
function setIDs() {
  // Get all the elements with the 'setID' class
  let elements = document.getElementsByClassName('setID');

  // Iterate through all the element
  for (let i = 0; i < elements.length; i++) {
    // If it is of the type input
    if (elements[i].tagName.toLowerCase() === "input") {
      // Create an id
      let id = 1000 + i;
      // Set the id of the element
      elements[i].id = id;
      // If the next element has the 'setFor' class
      if (elements[i].nextElementSibling.classList.contains('setFor')) {
        // Set the for value to the id
        elements[i].nextElementSibling.htmlFor = id;
      }
    }
  }
}
