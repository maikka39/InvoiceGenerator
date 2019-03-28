// Connect to the backend
const {
  remote
} = require('electron');

let progressBar = document.getElementById('progress_bar');

// Load the values from the values script
const values = remote.require('./backend/values').get();

// Load the word script
const word = remote.require('./backend/word');

let data = {
  klant_bedrijf: values["client"]["company"],
  project_naam: 'PROJECT NAAM' + 'OFFERTE NUMMER',
  offerte_datum: values["invoice_date"],

  // klant_bedrijf: '',
  klant_aanhef: values["client"]["salutation"],
  klant_volledige_naam: values["client"]["firstname"] + " " + values["client"]["insertion"] + " " + values["client"]["lastname"],
  klant_adres: values["client"]["street"],
  klant_postcode: values["client"]["postalcode"],
  klant_plaats: values["client"]["city"],

  huidige_datum: values["invoice_date"],

  offerte_onderwerp: 'PROJECT NAAM',
  offerte_nummer: 'PROJECT NUMMER',
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

  totaal_prijs: "€" + "TOTAAL PRIJS" + ",-",
}

// Generate the word document
let link = word.generate(values["invoice_type"], data);
progressBar.value = 80;
// Generate it again to also fill in the values from the  prologue
link = word.generate(values["invoice_type"], data);
progressBar.value = 100;

// Redirect to next page and pass the invoice filename
window.location.href = "output.html?invoiceFilename=" + link
