var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
        description: {
        type: String,
        required: true,
        trim: true
        }
  });

var userSchema = mongoose.Schema({
        id: {
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
if (!userSchema.options.toObject) {
    userSchema.options.toObject = {};
  }
  userSchema.options.toObject.transform = (document, transformedDocument) => {
    delete transformedDocument.password;
    return transformedDocument;
  };
  
  mongoose.model('User', userSchema);