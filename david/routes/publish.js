var express = require('express');
var router = express.Router();
var exec = require('child_process').exec

/* GET publish page. */
router.get('/', function(req, res) {
  res.render('publish');
});

router.post('/upload', function(req, res) {
	console.log(req.body)
	console.log(req.files);

	if (!req.body.dir) {
		res.end('"dir" not specified.')
		return
	}

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
		'-aoa', 
		'"-o' + process.env.PublishRoot + '/' + req.body.dir + '/' + '"', 
		'"' + req.files.webpage.path + '"' 
	].join(' ')
	
	console.log(cmd)

	exec(cmd, function(error, stdout, stderr) {
		if (error) {
			res.render('publish_done', {detail: stderr})
			return
		}

		res.render('publish_done', {detail: stdout})
	})
})

module.exports = router;
