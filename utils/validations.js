var mongoose = require('mongoose');


// Helper functions for doing all kind of validations on the request body inputs
module.exports.isString = function(str) {
  return typeof str === 'string';
};


module.exports.isObjectId = function(id) {
  return mongoose.Types.ObjectId.isValid(id);
};
