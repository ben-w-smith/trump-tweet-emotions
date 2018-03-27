var express = require('express');
var app = express();
var tweets = require('./tweet-nlu');

app.set('json spaces', 4);

app.get('/', function(req, res, next) {
	tweets(5).then(function(tweets) {
		res.send(tweets);
	}).catch(next)
});

app.use(function(err, req, res, next) {
	// handle error
	res.send('error\n' + JSON.stringify(err, null, 2));
})

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
})