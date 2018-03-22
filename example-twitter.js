var twitter = require('./config').twitter;

var error = function(err, resp, body) {
    console.log('ERROR', err);
}

var success = function(data) {
    console.log('Data', data);
}

twitter.get('/statuses/user_timeline', {
    screen_name: 'realDonaldTrump',
    count: 10
}).then(function(data) {
    console.log(data);
}).catch(function(err) {
    throw JSON.stringify(err, null, 2);
})