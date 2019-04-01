// Library docs:
// https://docxtemplater.readthedocs.io/en/latest/index.html

// Import the used libraries
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

module.exports = {
  generate: function (template_name, values) {
    // Enter the path of the template
    let file_path = template_name + ".docx"

    // Load the template file as binary
    var content = fs.readFileSync(path.resolve(__dirname, "../templates", file_path), 'binary');

    // Load the binary as a zip file
    var zip = new JSZip(content);

    // Create a new document
    var doc = new Docxtemplater();

    // Load the zip in the library
    doc.loadZip(zip);

    // Set the values which should be replaced in the template
    doc.setData(values);

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

    // Get the current date
    let date = new Date();
    // Create an output file_name
    let output_file = "invoice_" + date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + values["klant_bedrijf"].replace(/[^a-zA-Z0-9]/g, '_') + ".docx";

    // Write the file to the computer
    fs.writeFileSync(path.resolve(__dirname, "../output", output_file), buf);

    // Return the path to the outputed file
    return output_file;
  }
}
