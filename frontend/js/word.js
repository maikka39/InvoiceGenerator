const {
  remote
} = require('electron');

const word = remote.require('./backend/word');

word.test()
