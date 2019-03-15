// Library docs:
// https://docxtemplater.readthedocs.io/en/latest/index.html
var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

let file_path = "example.docx"

//Load the docx file as a binary
var content = fs.readFileSync(path.resolve(__dirname, file_path), 'binary');

// Convert file to zip
var zip = new JSZip(content);

// Load the zip in the library
var doc = new Docxtemplater();
doc.loadZip(zip);

// Set the templateVariables
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

try {
  // Render the document (replace all occurences of {var} by var_value)
  doc.render()
} catch (error) {
  var e = {
    message: error.message,
    name: error.name,
    stack: error.stack,
    properties: error.properties,
  }
  console.log(JSON.stringify({
    error: e
  }));
  // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
  throw error;
}

// Get the rendered word file as a nodejs buffer
var buf = doc.getZip()
  .generate({
    type: 'nodebuffer'
  });

// Write the file to the file system
fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
