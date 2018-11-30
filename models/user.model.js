var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
    description: {
      type: String,
      required: true,
      trim: true
    }
  });

var userSchema = mongoose.Schema({
    method: {
      type: String,
      enum: ['local', 'google'],
      required: true
    },
    local: {
      email: {
        type: String,
        lowercase: true
      },
      password: { 
        type: String
      },
      notes: [noteSchema]
    },
    google: {
      id: {
        type: String
      },
      email: {
        type: String,
        lowercase: true
      },
      notes: [noteSchema]
    }
  });


  // Override the transform function of the schema to delete the password before it returns the object
if (!userSchema.options.toObject) {
    userSchema.options.toObject = {};
  }
  userSchema.options.toObject.transform = (document, transformedDocument) => {
    if (this.method === 'local') {
        delete transformedDocument.local.password;
    }
    return transformedDocument;
  };
  
  mongoose.model('User', userSchema);