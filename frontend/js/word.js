const {
  remote
} = require('electron');

const test = remote.require('./backend/test');

test.test()
