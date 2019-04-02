// Connect to the backend
const {
  remote
} = require('electron');

const electron = require('electron');
const path = require('path');
const fs = remote.require('fs');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');

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
function readFile(relativeFilePath) {
  let fullpath = path.join(userDataPath, relativeFilePath);

  // Read the file in a synchronous manner
  let data = fs.readFileSync(fullpath);
  // Parse the data
  // let parsedData = JSON.parse(data);

  // return parsedData;
  return data;
}
