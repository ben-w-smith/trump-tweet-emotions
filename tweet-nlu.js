var twitter = require('./config').twitter;
var nlu = require('./config').natural_language_understanding

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

twitter.get('/statuses/user_timeline', {
    screen_name: 'realDonaldTrump',
    count: 3
}).then(function (data) {
    return tweets = data.map(function (tweet) {
        return tweet.text;
    });
}).then(function() {
    return tweets.asyncMap(function(tweet, index) {
        return nluAnalyze(tweet).then(function(analysis) {
            // console.log('Tweet: ' + index, JSON.stringify(analysis, null, 2));
            return tweets[index] = {
                "tweet": tweet,
                "sentiment": analysis.sentiment.document,
                "emotion": analysis.emotion.document.emotion,
                "subject": {
                    "target": analysis.entities[0].text,
                    "sentiment": analysis.entities[0].sentiment,
                    "emotion": analysis.entities[0].emotion
                }
            };
        }).catch(function(err) {
            throw JSON.stringify(err, null, 2);
        })
    });
}).then(function() {
    console.log(JSON.stringify(tweets, null, 2));
}).catch(function (err) {
    throw JSON.stringify(err, null, 2);
});

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

Array.prototype.asyncMap = function(callback) {
    return Promise.resolve(this).then( async function(ar) {
        var out = [];
        for(var i = 0; i < ar.length; i++) {
            out[i] = await callback.call(ar, ar[i], i, ar);
        }
        return out;
    })
}