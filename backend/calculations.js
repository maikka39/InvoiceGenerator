const fs = require('fs');
const path = require('path');
const XlsxTemplate = require('xlsx-template');

// Load an XLSX file into memory
fs.readFile(path.join(__dirname, 'calculations2.xlsx'), function (err, data) {

  // Create a template
  let template = new XlsxTemplate(data);

  // Replacements take place on first sheet
  let sheetNumber = 1;

  // Set up some placeholder values matching the placeholders in the template
  let values = {
    projectnummer: "Hello",
    projectnaam: "Hi"
    // people: [{
    //     name: "John Smith",
    //     age: 20
    //   },
    //   {
    //     name: "Bob Johnson",
    //     age: 22
    //   }
    // ]
  };


  // Perform substitution
  template.substitute(sheetNumber, values);

  // Get binary data
  let newData = template.generate();

  // Write it to the file
  fs.writeFile(path.join(__dirname, 'calculations_edit.xlsx'), newData, (err) => {
    // If there is an error, throw it
    if (err) throw err;
  });

});
