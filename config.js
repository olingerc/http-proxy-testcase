'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');
var os = require('os');

module.exports = {
   root: rootPath,
   port: process.env.PORT || 5000,

   // The secret should be set to a non-guessable string that
   // is used to compute a session hash
   sessionSecret: 'TOP-SECRET',
   // The name of the MongoDB collection to store sessions in
};