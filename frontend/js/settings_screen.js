// Connect to the backend
const {
  remote
} = require('electron');

// Import the 'fs' library
const fs = remote.require('fs');

// Get the product_names container
let productNames = document.getElementById('product_names');
let productPrice = document.getElementById('product_price');
let productUnit = document.getElementById('product_unit');

// Read the tenets file in a synchronous manner
let pdata = fs.readFileSync('./backend/databases/products.json');
// Parse the data
let products = JSON.parse(pdata);

// Loop through all catergories
for (let catergory in products) {
  // Make sure it exists
  if (products.hasOwnProperty(catergory)) {
    // Create a clone of the catergory label and the other columns
    let ncln = productNames.children[1].cloneNode(true);
    let pcln = productPrice.children[1].cloneNode(true);
    let ucln = productUnit.children[1].cloneNode(true);
    // Set the text to the catergory name
    ncln.innerText = catergory;

    // Append the editted clone the the parent
    productNames.appendChild(ncln);
    productPrice.appendChild(pcln);
    productUnit.appendChild(ucln);

    // Loop through all products
    for (let product in products[catergory]) {
      // Make sure it exists
      if (products[catergory].hasOwnProperty(product)) {
        // Create a clone of the products
        let nccln = productNames.children[2].cloneNode(true);
        let pccln = productPrice.children[2].cloneNode(true);
        let uccln = productUnit.children[2].cloneNode(true);
        // Set the text to the catergory name and fill in the price and unit
        nccln.children[0].value = product;
        pccln.children[0].value = products[catergory][product][0];
        uccln.children[0].value = products[catergory][product][1];
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
let tdata = fs.readFileSync('./backend/databases/tenets.json');
// Parse the data
let tenets = JSON.parse(tdata);

// Loop through all catergories
for (let catergory in tenets) {
  // Make sure it exists
  if (tenets.hasOwnProperty(catergory)) {
    // Create a clone of the catergory label and the other columns
    let tncln = tenetName.children[1].cloneNode(true);
    let tpcln = tenetValue.children[1].cloneNode(true);
    // Set the text to the catergory name
    tncln.innerText = catergory;

    // Append the editted clone the the parent
    tenetName.appendChild(tncln);
    tenetValue.appendChild(tpcln);

    // Loop through all tenets
    for (let tenet in tenets[catergory]) {
      // Make sure it exists
      if (tenets[catergory].hasOwnProperty(tenet)) {
        // Create a clone of the tenets
        let tnccln = tenetName.children[2].cloneNode(true);
        let tpccln = tenetValue.children[2].cloneNode(true);
        // Set the text to the catergory name and fill in the price and unit
        tnccln.children[0].value = tenet;
        tpccln.children[0].value = tenets[catergory][tenet];
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
let odata = fs.readFileSync('./backend/databases/other.json');
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

function saveSettings() {
  // TODO: Save data

  // Redirect user back to the start page
  window.location.href = "start.html"
}
