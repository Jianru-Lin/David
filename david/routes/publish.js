var express = require('express');
var router = express.Router();

/* GET publish page. */
router.get('/', function(req, res) {
  res.render('publish');
});

module.exports = router;
