var express = require('express');
var router = express.Router();
var getData = require('../public/js/getData');

/* GET home page. */
router.get('/', function(req, res, next) {
  //var data = getData();
  res.render('index', { title: 'Express' });
});

module.exports = router;
