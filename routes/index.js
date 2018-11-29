var express = require('express');
var router = express.Router();
var noteCtrl = require('../controllers/note.controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/note/create', noteCtrl.createNote);
module.exports = router;
