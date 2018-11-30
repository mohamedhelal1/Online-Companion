var express = require('express');
var passport = require('passport');
var router = express.Router();
var noteCtrl = require('../controllers/note.controller');
var authCtrl = require('../controllers/auth.controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//------------------------------------NOTE ROUTES----------------------------------
/////Auth
router.route('/auth/login')
  .post(passport.authenticate('googleToken', { session: false }), authCtrl.login);;

/////NOTE
router.post('/note/createNote', noteCtrl.createNote);
router.get('/note/getNotes', noteCtrl.getNotes);
router.delete('/note/deleteNote/:noteID', noteCtrl.deleteNote);
router.patch('/note/updateNote/:noteID',noteCtrl.updateNote);

module.exports = router;
