var express = require('express');
var router = express.Router();

/* GET publish page. */
router.get('/', function(req, res) {
  res.render('publish');
});

router.post('/', function(req, res) {
	console.log(req.files);
	res.end();
})

module.exports = router;
