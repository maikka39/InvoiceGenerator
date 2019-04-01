// Connect to the backend
const {
  remote
} = require('electron');

const path = require('path');

// Import the 'fs' library
const fs = remote.require('fs');

let progressBar = document.getElementById('progress_bar');

// Load the values from the values script
const values = remote.require(path.join(__dirname, '../backend/values')).get();

// Read the tenets file
let tdata = fs.readFileSync(path.join(__dirname, '../backend/databases/tenets.json'));
// Parse the JSON data
let tenets = JSON.parse(tdata);

// Read the products file
let pdata = fs.readFileSync(path.join(__dirname, '../backend/databases/products.json'));
// Parse the JSON data
let products = JSON.parse(pdata);

// Declare the tenetList
let tenetList = [];

// For every tenet in the tenets object
for (let tenet in tenets["Statisch"]) {
  // Check if it exists
  if (tenets["Statisch"].hasOwnProperty(tenet)) {
    // Then create an object for it and add it to the tenet list
    tenetList.push({
      "uitgangspunt": tenets["Statisch"][tenet]
    });
  }
}

let dynamicTenets = {};

// Loop through all products
for (let i = 0; i < values["products"].length; i++) {
  // Loop through all their tenets
  for (let tenet in values["products"][i]["tenets"]) {
    // Check if the tenet exists
    if (values["products"][i]["tenets"].hasOwnProperty(tenet)) {
      // If the tenet is selected
      if (values["products"][i]["tenets"][tenet]) {
        // Add it to the dynamicTenets object
        dynamicTenets[tenet] = tenets["Dynamisch"][tenet];
      }
    }
  }
}

// For every tenet in the selected dynamic tenets
for (let tenet in dynamicTenets) {
  // Check if the tenet exists
  if (dynamicTenets.hasOwnProperty(tenet)) {
    // Then create an object for it and add it to the tenet list
    tenetList.push({
      "uitgangspunt": dynamicTenets[tenet]
    });
  }
}


let price = 0;

// Loop through all products
for (let i = 0; i < values["products"].length; i++) {
  let pamount = parseInt(values["products"][i]["amount"]);
  let pprice = 0;

  for (var category in products) {
    if (products.hasOwnProperty(category)) {
      for (var product in products[category]) {
        if (products[category].hasOwnProperty(product)) {
          if (product == values["products"][i]["name"]) {
            pprice = products[category][product][0];
          }
        }
      }
    }
  }

  price += pprice * pamount
}

// Read the other file
let odata = fs.readFileSync(path.join(__dirname, '../backend/databases/other.json'));
// Parse the JSON data
let other = JSON.parse(odata);

price += price * 0.01 * other["profit_margin"];
price = Math.ceil(price);


// Declare the data for the word renderer
let data = {
  klant_bedrijf: values["client"]["company"],
  project_naam: values["project_title"] + " - " + values["project_number"],
  offerte_datum: values["invoice_date"],

  // klant_bedrijf: '',
  klant_aanhef: values["client"]["salutation"],
  klant_volledige_naam: values["client"]["firstname"] + " " + values["client"]["insertion"] + " " + values["client"]["lastname"],
  klant_adres: values["client"]["street"],
  klant_postcode: values["client"]["postalcode"],
  klant_plaats: values["client"]["city"],

  huidige_datum: values["invoice_date"],

  offerte_onderwerp: values["project_title"],
  offerte_nummer: values["project_number"],

  inleiding: values["prologue"]["prologue"],
  slot: values["prologue"]["epilogue"],

  offerte_aanvraag_datum: values["request_date"],
  offerte_aanvraag_datum_voluit: values["request_date_text"],

  uitgangspunten: tenetList,

  totaal_prijs: "€" + price + ",-"
}

// Load the word script
const word = remote.require(path.join(__dirname, '../backend/word'));

// Generate the word document
let link = word.generate(values["invoice_type"], data);
progressBar.value = 80;
// Generate it again to also fill in the values from the  prologue
link = word.generate(values["invoice_type"], data);
progressBar.value = 100;

// Redirect to next page and pass the invoice filename
window.location.href = "output.html?invoiceFilename=" + link
