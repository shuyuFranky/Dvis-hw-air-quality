var express = require('express');
var router = express.Router();
var getData = require('../public/js/getData');

/* GET home page. */
router.get('/', function(req, res, next) {
  //var data = getData();
  res.render('scatter', { title: 'Express' });
});

/* GET home page. */
router.get('/demo', function(req, res, next) {
  //var data = getData();
  res.render('index-demo', {});
});

/* GET Scatter Page. */
router.get('/scatter', function(req, res, next) {
  res.render('scatter', {});
});

/* GET Line Page. */
router.get('/line', function(req, res, next) {
  res.render('line', {});
});

/* GET Bar Page. */
router.get('/bar', function(req, res, next) {
  res.render('bar', {});
});

module.exports = router;
