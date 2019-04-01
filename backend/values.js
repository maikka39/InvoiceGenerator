const path = require('path');

// Import the 'fs' library
const fs = require('fs');

// Declare the global values dictonary
let values = {};

// Dictonary to convert weekday to Dutch
let days = {
  "Mon": "maandag",
  "Tue": "dinsdag",
  "Wed": "woensdag",
  "Thu": "donderdag",
  "Fri": "vrijdag",
  "Sat": "zaterdag",
  "Sun": "zondag"
};

// Dictonary to convert month to Dutch
let months = {
  1: "januari",
  2: "februari",
  3: "maart",
  4: "april",
  5: "mei",
  6: "juni",
  7: "juli",
  8: "augustus",
  9: "september",
  10: "oktober",
  11: "november",
  12: "december"
};

// Get the current date
let date = new Date();

// Calculate all the values
dates = {
  date: date.getDate().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getFullYear().toString(),
  day: date.getDate(),
  weekday_string: days[date.toString().substring(0, 3)],
  month: date.getMonth() + 1,
  month_string: months[date.getMonth() + 1],
  year: date.getFullYear()
}

values["invoice_date"] = dates["weekday_string"] + ' ' + dates["day"].toString() + ' ' + dates["month_string"] + ' ' + dates["year"];

values["date"] = dates

// Everything in here can be used by other scripts
module.exports = {
  /**
   * Assign the project to an employee.
   * @param {string} name - The name of the value which should be set.
   * @param {*} data - The data of the value which should be set.
   */
  set: function (name, data) {
    // Add the provided data to the values
    values[name] = data;
  },
  /**
   * Log all the currently set values
   */
  log: function () {
    // Log al current values
    console.log(values);
  },
  /**
   * Return all the currently set values
   */
  get: function () {
    // Send back all the values
    return values;
  },
  save: function () {
    // Convert values to JSON
    let data = JSON.stringify(values, null, 2);

    // Write it to a file
    fs.writeFile(path.join(__dirname, '../backend/values.json'), data, (err) => {
      // If there is an error, throw it
      if (err) throw err;
    });
  }
};
