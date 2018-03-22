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

nlu.analyze(parameters, function (err, response) {
    if (err)
        console.log('error:', err);
    else
        console.log(JSON.stringify(response, null, 2));
});