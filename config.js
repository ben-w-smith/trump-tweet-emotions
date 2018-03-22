require('dotenv').config();

//--------------------------
// Watson NLU
//--------------------------
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var nlu = {
    "natural-language-understanding": [
        {
            "name": "natural-language-underst-natural-la-1521644051070",
            "plan": "free",
            "credentials": {
                "url": process.env.NLU_URL,
                "username": process.env.NLU_USERNAME,
                "password": process.env.NLU_PASSWORD
            }
        }
    ]
};

var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': process.env.NLU_USERNAME,
    'password': process.env.NLU_PASSWORD,
    'version_date': '2017-02-27'
});



//--------------------------
// Twitter  
//--------------------------
var Twitter = require('twitter');

var credentials = {
    "consumer_key": process.env.TWITTER_CONSUMER_KEY,
    "consumer_secret": process.env.TWITTER_CONSUMER_SECRET,
    "access_token_key": process.env.TWITTER_ACCESS_TOKEN_KEY,
    "access_token_secret": process.env.TWITTER_ACCESS_TOKEN_SECRET
};

var twitter = new Twitter(credentials);




//--------------------------
// Module Exports 
//--------------------------
module.exports = {
    "natural_language_understanding": natural_language_understanding,
    "twitter": twitter
};