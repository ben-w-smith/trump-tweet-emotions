var nlu = require('./config').natural_language_understanding;

var parameters = {
    'text': 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.',
    'features': {
        'entities': {
            'emotion': true,
            'sentiment': true,
            'limit': 2
        },
        'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2
        }
    }
}

function nluAnalyze() {
    return new Promise(function (resolve, reject) {
        nlu.analyze(parameters, function (err, response) {
            if (err)
                reject(err)
            else
                resolve(response)
        });
    })
}

nluAnalyze().then(function(result) {
    console.log(result);
}).catch(function(err) {
    console.log(err);
});