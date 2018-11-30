var mongoose = require('mongoose');

var Validations = require('../utils/validations');
var User = mongoose.model('User');


module.exports.createNote = function(req, res, next) {
    console.log(req.decodedToken);
    User.findById(req.decodedToken.data._id).exec(function(err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res
            .status(404)
            .json({ err: null, msg: 'User not found.', data: null });
        }
        var newNoteTitle = req.body.title.trim();

        var noteTitleExists = user.notes.some(function(note) {
          return note.title == newNoteTitle;
        });

        if (noteTitleExists) {
          return res.status(409).json({
            err: null,
            msg:
              'A note with the same title "' +
              newNoteTitle +
              '" already exists, please try another name.',
            data: null
          });
        }
    
    
        var newNote = user.notes.create(req.body);
        user.notes.push(newNote);
        user.save(function(err) {
          if (err) {
            return next(err);
          }
          res.status(201).json({
            err: null,
            msg: 'Note was created successfully.',
            data: newNote
          });
        });
      });
  };

  module.exports.getNotes = function(req, res, next) {
    User.findById(req.decodedToken.data._id).exec(function(err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res
            .status(404)
            .json({ err: null, msg: 'User not found.', data: null });
        }
        res.status(200).json({
          err: null,
          msg: 'Notes retrieved successfully.',
          data: user.notes
        });
      });
  };



  module.exports.deleteNote = function(req, res, next) {
    if (!Validations.isObjectId(req.params.noteID)) {
        return res.status(422).json({
          err: null,
          msg: 'noteID parameter must be a valid ObjectId.',
          data: null
        });
      }
    User.findById(req.decodedToken.data._id).exec(function(err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res
            .status(404)
            .json({ err: null, msg: 'User not found.', data: null });
        }
        var note = user.notes.id(req.params.noteID);
        if (!note) {
          return res
            .status(404)
            .json({ err: null, msg: 'Note not found.', data: null });
        }
        note.remove();
        user.save(function(err) {
          if (err) {
            return next(err);
          }
          res.status(200).json({
            err: null,
            msg: 'Note was deleted successfully.',
            data: null
          });
        });
      });

    

  
};

module.exports.updateNote = function(req, res, next) {
    if (!Validations.isObjectId(req.params.noteID)) {
        return res.status(422).json({
          err: null,
          msg: 'noteID parameter must be a valid ObjectId.',
          data: null
        });
      }
    User.findById(req.decodedToken.data._id).exec(function(err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res
            .status(404)
            .json({ err: null, msg: 'User not found.', data: null });
        }
    
        var note = user.notes.id(req.params.noteID);
        if (!note) {
          return res
            .status(404)
            .json({ err: null, msg: 'Note not found.', data: null });
        }
        note.description = req.body.description;
        note.title = req.body.title;
        
        user.save(function(err) {
          if (err) {
            return next(err);
          }
          res.status(200).json({
            err: null,
            msg: 'Note was updated successfully.',
            data: note
          });
        });
      });
};