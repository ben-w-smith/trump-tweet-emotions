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
    count: 1
}).then(function (data) {
    var tweets = data.map(function (tweet) {
        return tweet.text;
    });

    tweets.forEach(function(tweet, index) {
        nluAnalyze(tweet).then(function(analysis) {
            console.log('Tweet: ' + index, JSON.stringify(analysis, null, 2));
        }).catch(function(err) {
            throw JSON.stringify(err, null, 2);
        })
    });
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

/*
// nlu.analyze(parameters, function (err, resp) {
//     if (err) {
//         console.log('nlu error:', err);
//         return false;
//     } else {
//         console.log(JSON.stringify(resp));
//     }
// })
//*/
// var nluAnalyze = function (tweets) {
//     tweets.forEach(function (tweet) {
//         var parameters = {
//             'text': tweet,
//             'return_analyzed_text': true,
//             'features': {
//                 'emotion': {
//                 },
//                 'sentiment': {
//                 },
//                 'concepts': {
//                     'limit': 3
//                 },
//                 'entities': {
//                     'sentiment': true,
//                     'emotion': true,
//                     'limit': 3,
//                 }
//             }
//         };

//         nlu.analyze(parameters, nluResult);
//     })
// }

// var error = function (err, resp, body) {
//     console.log('ERROR:', err);
// }

// var success = function (data) {
//     var tweets = JSON.parse(data).map(function (tweet) {
//         return tweet.text;
//     });
//     console.log(tweets);
// }