var express = require('express');
var router = express.Router();
var exec = require('child_process').exec

/* GET publish page. */
router.get('/', function(req, res) {
  res.render('publish');
});

router.post('/upload', function(req, res) {
	console.log(req.files);

	if (!req.files) {
		res.end('no files uploaded.')
		return
	}

	if (!req.files.webpage) {
		res.end('where is the "webpage" one in your uploaded files?')
		return
	}

	var cmd = [
		'7z', 
		'x', 
		'"-o' + process.env.PublishRoot + '"', 
		'"' + req.files.webpage.path + '"' 
	].join(' ')
	
	console.log(cmd)

	exec(cmd, function(error, stdout, stderr) {
		if (error) {
			console.log(error)
			res.end(error.toString())
			return
		}

		console.log(stdout)
		res.end(stdout)
	})
})

module.exports = router;
