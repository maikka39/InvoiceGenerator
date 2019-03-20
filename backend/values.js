let values = {};

let days = {
  "Mon": "maandag",
  "Tue": "dinsdag",
  "Wed": "woensdag",
  "Thu": "donderdag",
  "Fri": "vrijdag",
  "Sat": "zaterdag",
  "Sun": "zondag"
};

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

let date = new Date();

values["current_date"] = date.getDate().toString() + "-" + date.getMonth().toString() + "-" + date.getFullYear().toString();
values["current_day"] = date.getDate();
values["current_weekday_string"] = days[date.toString().substring(0, 3)];
values["current_month"] = date.getMonth();
values["current_month_string"] = months[date.getMonth()];
values["current_year"] = date.getFullYear();

values["offerte_datum"] = values["current_weekday_string"] + ' ' + values["current_day"].toString() + ' ' + values["current_month_string"] + ' ' + values["current_year"];

module.exports = {
  set: function (name, data) {
    values[name] = data;
    // console.log(values);
  },
  log: function () {
    console.log(values);
  }
};
