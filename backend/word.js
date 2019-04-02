// Library docs:
// https://docxtemplater.readthedocs.io/en/latest/index.html

// Import the used libraries
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

/**
 * Save data to a file.
 * @param {string} relativeFilePath - The relative path of the file.
 * @param {Object} data - The object which should be saved.
 */
function writeFile(relativeFilePath, data) {
  let fullpath = path.join(userDataPath, relativeFilePath);

  // fs.writeFileSync(fullpath, JSON.stringify(data));
  fs.writeFileSync(fullpath, data);
}

/**
 * Read data from a file.
 * @param {string} relativeFilePath - The relative path of the file.
 */
function readFileBinary(relativeFilePath) {
  let fullpath = path.join(userDataPath, relativeFilePath);

  // Read the file in a synchronous manner
  let data = fs.readFileSync(fullpath, 'binary');
  // Parse the data
  // let parsedData = JSON.parse(data);

  // return parsedData;
  return data;
}

module.exports = {
  generate: function(template_name, values) {
    // Enter the path of the template
    let file_path = template_name + ".docx"

    // Load the template file as binary
    var content = readFileBinary("templates/" + file_path);

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
    writeFile("output/" + output_file, buf);

    // Return the path to the outputed file
    return output_file;
  }
}
