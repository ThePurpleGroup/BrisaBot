const Twit = require('twit');
const config = require('./config.js');
const tweetBot = new Twit(config);

const params = {
    q: 'Maconha',
    result_type: 'popular',
    count: 100,
    lang: 'pt'
}

const nearparams = {
    q: 'Maconha',
    result_type: 'recent',
    count: 100,
    lang: 'pt'
}


tweetBot.get('search/tweets', params,  (err, data, res) => {
    if(!err){
        for(let i=0; i < data.statuses.length; i++){
            let tweetID = {id: data.statuses[i].id_str}
            tweetBot.post('statuses/retweet', tweetID, (err, res) => {
                if(!err){
                    console.log(`Retweet successful` + i)
                }else{
                    console.log(err.message)
                }
            })
            tweetBot.post('favorites/create', tweetID, (err, res) => {
                if(!err){
                    console.log(`Favorite successful` + i)
                }else{
                    console.log(err.message)
                }
            })
        }
    }else{
        console.log(err)
    }
})

tweetBot.get('search/tweets', nearparams,  (err, data, res) => {
    if(!err){
        for(let i=0; i < data.statuses.length; i++){
            let tweetID = {id: data.statuses[i].id_str}
            tweetBot.post('statuses/retweet', tweetID, (err, res) => {
                if(!err){
                    console.log(`Retweet Recent successful` + i)
                }else{
                    console.log(err.message)
                }
            })
            tweetBot.post('favorites/create', tweetID, (err, res) => {
                if(!err){
                    console.log(`Favorite Recent successful` + i)
                }else{
                    console.log(err.message)
                }
            })
        }
    }else{
        console.log(err)
    }
})

