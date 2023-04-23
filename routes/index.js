var express = require('express');
var router = express.Router();
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('message');
  res.render('drive_in_count.html');
  console.log('after');
});

module.exports = router;
