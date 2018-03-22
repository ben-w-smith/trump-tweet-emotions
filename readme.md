# Donald Trump Twitter Emotions

Welcome, this repo measures Donald Trumps emotions and sentiment using IBM Watson's Natural Language Understanding (nlu). To get this running you'll requires two steps.

1) Add your api credentials for Twitter and IBM Cloud in the .env Example. There is an .env.example file you can use.
2) Run npm install in the root directory

You can now run `$ node tweet-nlu.js` and get a result.


## Example Output
```
[
    {
        "tweet": "Crazy Joe Biden is trying to act like a tough guy. Actually, he is weak, both mentally and physically, and yet he t… https://t.co/4e33ZxnAw7",
        "sentiment": {
            "score": -0.43879,
            "label": "negative"
        },
        "emotion": {
            "sadness": 0.612104,
            "joy": 0.02095,
            "fear": 0.088513,
            "disgust": 0.247877,
            "anger": 0.352674
        },
        "subject": {
            "target": "Joe Biden",
            "sentiment": {
                "score": -0.563644,
                "label": "negative"
            },
            "emotion": {
                "sadness": 0.669005,
                "joy": 0.052642,
                "fear": 0.052314,
                "disgust": 0.054272,
                "anger": 0.397482
            }
        }
    }
]
```