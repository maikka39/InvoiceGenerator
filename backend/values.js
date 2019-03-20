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
values["current_date"] = date.getDate().toString() + "-" + date.getMonth().toString() + "-" + date.getFullYear().toString();
values["current_day"] = date.getDate();
values["current_weekday_string"] = days[date.toString().substring(0, 3)];
values["current_month"] = date.getMonth();
values["current_month_string"] = months[date.getMonth()];
values["current_year"] = date.getFullYear();

values["offerte_datum"] = values["current_weekday_string"] + ' ' + values["current_day"].toString() + ' ' + values["current_month_string"] + ' ' + values["current_year"];

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
    // console.log(values);
  },
  /**
   * Log all the currently set values
   */
  log: function () {
    // Log al current values
    console.log(values);
  }
};
