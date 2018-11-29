var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  }
});

mongoose.model('Note', noteSchema);
