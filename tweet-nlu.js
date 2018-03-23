var twitter = require('./config').twitter;
var nlu = require('./config').natural_language_understanding

var screen_name = 'realDonaldTrump';

// nlu parameters, see docs for options
// used in nluAnalyze, text is populated there
var parameters = {
	'text': '',
	'return_analyzed_text': true,
	'features': {
		'emotion': {
		},
		'sentiment': {
		},
		'entities': {
			'sentiment': true,
			'emotion': true,
			'limit': 3,
		}
	}
};

// begin getting twitter posts
function analyzedTweets () {
	return new Promise(function(resolve, reject) {
		twitter.get('/statuses/user_timeline', {
			screen_name: screen_name,
			count: 1
		}).then(function (data) {
		    // extract out only the text
		    tweets = data.map(function (tweet) {
		    	return tweet.text;
		    });
		}).then(function() {
		    // run async map over tweets
		    return analyzeTweets(tweets)
		}).then(function() {
		    // print out nlu tweet analysis
		    // console.log('tweets: ', JSON.stringify(tweets, null, 2));
		    resolve(tweets);
		}).catch(function (err) {
			console.log('twitter err: ', JSON.stringify(err, null, 2));
		});
	})
}



//-----------------------
// Promise Helpers
//-----------------------
function nluAnalyze(tweet) {
	parameters.text = tweet;
	return new Promise(function(resolve, reject) {
		nlu.analyze(parameters, function(err, resp) {
			if(err) {
				reject(err);
			} else {
				resolve(resp);
			}
		})
	})
}

function analyzeTweets(tweets) {
	return tweets.asyncMap(function(tweet, index) {
        // get nlu results of a tweet then map analysis to tweet
        return nluAnalyze(tweet).then(function(analysis) {
        	tweets[index] = {
        		"tweet": tweet,
        		"sentiment": analysis.sentiment.document,
        		"emotion": analysis.emotion.document.emotion,
        	}
        	if(analysis.entities[0]) {
        		tweets[index].subject = {
        			"target": analysis.entities[0].text,
        			"sentiment": analysis.entities[0].sentiment,
        			"emotion": analysis.entities[0].emotion
        		}
        	}
        	return tweets[index];
        }).catch(function(err) {
        	console.log('nlu err: ', JSON.stringify(err, null, 2));
        })
    });
}

Array.prototype.asyncMap = function(callback) {
	return Promise.resolve(this).then( async function(ar) {
		var out = [];
		for(var i = 0; i < ar.length; i++) {
			out[i] = await callback.call(ar, ar[i], i, ar);
		}
		return out;
	}).catch(function(err) {
		console.log('asyncMap err: ', err);
	})
}

module.exports = analyzedTweets;