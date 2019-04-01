// Connect to the backend
const {
  remote
} = require('electron');

const path = require('path');

// Import the 'fs' library
const fs = remote.require('fs');

// Make the bulma accordions work
var accordions = bulmaAccordion.attach();

// Get the product_names container
let productNames = document.getElementById('product_names');
let productPrice = document.getElementById('product_price');
let productUnit = document.getElementById('product_unit');

// Read the tenets file in a synchronous manner
let pdata = fs.readFileSync(path.join(__dirname, '../backend/databases/products.json'));
// Parse the data
let products = JSON.parse(pdata);

// Loop through all catergories
for (let category in products) {
  // Make sure it exists
  if (products.hasOwnProperty(category)) {
    // Create a clone of the category label and the other columns
    let ncln = productNames.children[1].cloneNode(true);
    let pcln = productPrice.children[1].cloneNode(true);
    let ucln = productUnit.children[1].cloneNode(true);
    // Set the text to the category name
    ncln.innerText = category;

    // Append the editted clone the the parent
    productNames.appendChild(ncln);
    productPrice.appendChild(pcln);
    productUnit.appendChild(ucln);

    // Loop through all products
    for (let product in products[category]) {
      // Make sure it exists
      if (products[category].hasOwnProperty(product)) {
        // Create a clone of the products
        let nccln = productNames.children[2].cloneNode(true);
        let pccln = productPrice.children[2].cloneNode(true);
        let uccln = productUnit.children[2].cloneNode(true);
        // Set the text to the category name and fill in the price and unit
        nccln.children[0].value = product;
        pccln.children[0].value = products[category][product][0];
        uccln.children[0].value = products[category][product][1];
        // Append the editted clone the the parent
        productNames.appendChild(nccln);
        productPrice.appendChild(pccln);
        productUnit.appendChild(uccln);
      }
    }
  }
}

// Remove the initial category and input
productNames.removeChild(productNames.children[1]);
productNames.removeChild(productNames.children[1]);
productPrice.removeChild(productPrice.children[1]);
productPrice.removeChild(productPrice.children[1]);
productUnit.removeChild(productUnit.children[1]);
productUnit.removeChild(productUnit.children[1]);


// Get the product_names container
let tenetName = document.getElementById('tenet_name');
let tenetValue = document.getElementById('tenet_value');

// Read the tenets file in a synchronous manner
let tdata = fs.readFileSync(path.join(__dirname, '../backend/databases/tenets.json'));
// Parse the data
let tenets = JSON.parse(tdata);

// Loop through all catergories
for (let category in tenets) {
  // Make sure it exists
  if (tenets.hasOwnProperty(category)) {
    // Create a clone of the category label and the other columns
    let tncln = tenetName.children[1].cloneNode(true);
    let tpcln = tenetValue.children[1].cloneNode(true);
    // Set the text to the category name
    tncln.innerText = category;

    // Append the editted clone the the parent
    tenetName.appendChild(tncln);
    tenetValue.appendChild(tpcln);

    // Loop through all tenets
    for (let tenet in tenets[category]) {
      // Make sure it exists
      if (tenets[category].hasOwnProperty(tenet)) {
        // Create a clone of the tenets
        let tnccln = tenetName.children[2].cloneNode(true);
        let tpccln = tenetValue.children[2].cloneNode(true);
        // Set the text to the category name and fill in the price and unit
        tnccln.children[0].value = tenet;
        tpccln.children[0].value = tenets[category][tenet];
        // Append the editted clone the the parent
        tenetName.appendChild(tnccln);
        tenetValue.appendChild(tpccln);
      }
    }
  }
}

// Remove the initial category and input
tenetName.removeChild(tenetName.children[1]);
tenetName.removeChild(tenetName.children[1]);
tenetValue.removeChild(tenetValue.children[1]);
tenetValue.removeChild(tenetValue.children[1]);


// Read the 'other' file in a synchronous manner
let odata = fs.readFileSync(path.join(__dirname, '../backend/databases/other.json'));
// Parse the data
let other = JSON.parse(odata);

// Get the profit margin field
let profitMargin = document.getElementById('profit_margin');

// Set the profit margin field
profitMargin.value = other["profit_margin"] + "%";


/**
 * Add a row to the container.
 * @param {Object} el - The element which has been clicked.
 */
function addItemRow(el) {
  for (var i = 0; i < el.previousElementSibling.children.length; i++) {
    let acln = el.previousElementSibling.children[i].children[2].cloneNode(true);
    acln.children[0].value = "";

    el.previousElementSibling.children[i].appendChild(acln);
  }
}

/**
 * Save the new values to the backend.
 */
function saveSettings() {
  let newProducts = {}
  let currentCategory = {}
  let currentCatName;

  for (var i = 0; i < productNames.children.length; i++) {
    if (productNames.children[i].tagName.toLowerCase() === "label" && productNames.children[i].innerText !== "Naam") {
      if (currentCatName) {
        newProducts[currentCatName] = currentCategory;
      }
      currentCatName = productNames.children[i].innerText;
      currentCategory = {};
    }

    if (productNames.children[i].tagName.toLowerCase() === "div") {
      if (productNames.children[i].children[0].tagName.toLowerCase() === "input") {
        let product = productNames.children[i].children[0].value;
        let price = productPrice.children[i].children[0].value;
        let unit = productUnit.children[i].children[0].value;

        currentCategory[product] = [parseFloat(price), unit];
      }
    }
  }

  newProducts[currentCatName] = currentCategory;

  // Convert back to JSON
  let pnewData = JSON.stringify(newProducts, null, 2);

  // Write it to the file
  fs.writeFile(path.join(__dirname, '../backend/databases/products.json'), pnewData, (err) => {
    // If there is an error, throw it
    if (err) throw err;
  });


  let tenetNames = document.getElementById('tenet_name');
  let tenetValues = document.getElementById('tenet_value');

  currentCatName = "";
  currentCategory = {};

  let newTenets = {};

  for (var i = 0; i < tenetNames.children.length; i++) {
    if (tenetNames.children[i].tagName.toLowerCase() === "label" && tenetNames.children[i].innerText !== "Naam") {
      if (currentCatName) {
        newTenets[currentCatName] = currentCategory;
      }
      currentCatName = tenetNames.children[i].innerText;
      currentCategory = {};
    }

    if (tenetNames.children[i].tagName.toLowerCase() === "div") {
      if (tenetNames.children[i].children[0].tagName.toLowerCase() === "input") {
        let tenet = tenetNames.children[i].children[0].value;
        let value = tenetValues.children[i].children[0].value;

        currentCategory[tenet] = value;
      }
    }
  }

  newTenets[currentCatName] = currentCategory;

  // Convert back to JSON
  let tnewData = JSON.stringify(newTenets, null, 2);

  // Write it to the file
  fs.writeFile(path.join(__dirname, '../backend/databases/tenets.json'), tnewData, (err) => {
    // If there is an error, throw it
    if (err) throw err;
  });









  newOther = {};
  newOther["profit_margin"] = parseFloat(document.getElementById("profit_margin").value);

  // Convert back to JSON
  let onewData = JSON.stringify(newOther, null, 2);

  // Write it to the file
  fs.writeFile(path.join(__dirname, '../backend/databases/other.json'), onewData, (err) => {
    // If there is an error, throw it
    if (err) throw err;
  });


  // Redirect user back to the start page
  window.location.href = "start.html"
}
