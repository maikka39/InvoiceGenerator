// Library docs:
// https://docxtemplater.readthedocs.io/en/latest/index.html

// Import the used libraries
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

// Enter the path of the template
let file_path = "example.docx"

//Load the template file as binary
var content = fs.readFileSync(path.resolve(__dirname, file_path), 'binary');

// Load the binary as a zip file
var zip = new JSZip(content);

// Create a new document
var doc = new Docxtemplater();

// Load the zip in the library
doc.loadZip(zip);

// Set the values which should be replaced in the template
doc.setData({
  klant_bedrijf: 'Blend4',
  project_naam: '20184848 Plafond Lounge Roosendaal',
  offerte_datum: '5 maart 2018',

  // klant_bedrijf: '',
  klant_aanhef: 'de heer',
  klant_volledige_naam: 'Jeroen Franken',
  klant_adres: 'Boulevard 62',
  klant_postcode: '4701 EW',
  klant_plaats: 'ROOSENDAAL',

  huidige_datum: 'vrijdag 5 maart 2018',

  offerte_onderwerp: 'Offerte akoestische werkzaamheden',
  offerte_nummer: '7346552',
  // project_naam: '',

  gebasseerde_stukken: [{
    gebasseerd_stuk: "Uw offerteaanvraag van 1 maart 2018.",
  }, ],
  betreffende_werkzaamheden: [{
    betreffende_werkzaamheid: `
      Het leveren en aanbrengen van naadloos akoestisch middelfijn spuitwerk in een dikte van circa
      20/25 mm rechtstreeks tegen de bestaande, vlakke, luchtdichte en watervast draagkrachtige
      ondergrond.
    `,
  }, ],

  totaal_prijs: '€6913,-',
});

// Try is to prevent the program from closing is the rendering process fails
try {
  // Render the document (replace all occurences of {var} by var_value)
  doc.render()
} catch (error) {
  // If there is an error,
  // Get the values
  var e = {
    message: error.message,
    name: error.name,
    stack: error.stack,
    properties: error.properties,
  }
  // And log them as JSON
  console.log(JSON.stringify({
    error: e
  }));
  // Then throw an error which contains additional information (it contains a property object).
  throw error;
}

// Get the rendered word file as a nodejs buffer
var buf = doc.getZip()
  .generate({
    type: 'nodebuffer'
  });

// Write the file to the computer
fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
