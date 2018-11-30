var express = require('express');
var router = express.Router();
var noteCtrl = require('../controllers/note.controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//------------------------------------NOTE ROUTES----------------------------------

router.post('/note/createNote', noteCtrl.createNote);
router.get('/note/getNotes', noteCtrl.getNotes);
router.delete('/note/deleteNote/:noteID', noteCtrl.deleteNote);
router.patch('/note/updateNote/:noteID',noteCtrl.updateNote);

module.exports = router;
