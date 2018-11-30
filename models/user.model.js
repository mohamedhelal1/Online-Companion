var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
        description: {
        type: String,
        required: true,
        trim: true
        }
  });

var userSchema = mongoose.Schema({
        googleId: {
        type: String
        },
        email: {
        type: String,
        lowercase: true
        },
        firstname: {
        type: String
        },
        lastname: {
        type: String
        },
        notes: [noteSchema]
  });


  // Override the transform function of the schema to delete the password before it returns the object
  mongoose.model('User', userSchema);