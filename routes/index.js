var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../Config');
var router = express.Router();
var noteCtrl = require('../controllers/note.controller');
var authCtrl = require('../controllers/auth.controller');
var isAuthenticated = function(req, res, next) {
  // Check that the request has the JWT in the authorization header
  var token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      error: null,
      msg: 'You have to login first before you can access your lists.',
      data: null
    });
  }
  // Verify that the JWT is created using our server secret and that it hasn't expired yet
  jwt.verify(token,config.SECRET , function(err, decodedToken) {
    if (err) {
      return res.status(401).json({
        error: err,
        msg: 'Login timed out, please login again.',
        data: null
      });
    }
    req.decodedToken = decodedToken;
    next();
  });
};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//------------------------------------NOTE ROUTES----------------------------------
/////Auth
router.route('/auth/login')
  .post(passport.authenticate('googleToken', { session: false }), authCtrl.login);;

/////NOTE
router.post('/note/createNote',isAuthenticated , noteCtrl.createNote);
router.get('/note/getNotes',isAuthenticated , noteCtrl.getNotes);
router.delete('/note/deleteNote/:noteID',isAuthenticated , noteCtrl.deleteNote);
router.patch('/note/updateNote/:noteID',isAuthenticated ,noteCtrl.updateNote);

module.exports = router;
