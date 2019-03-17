let values = {};

module.exports = {
  set: function (name, data) {
    values[name] = data;
    console.log(values);
  },
};
