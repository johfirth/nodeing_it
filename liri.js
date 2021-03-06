require("dotenv").config();
const request = require("request");
const keys = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api')
const fs = require("fs")


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var command = process.argv[2];
var thing = process.argv[3];


function liri(){
    if (command === 'movie-this'){
        var queryUrl = "http://www.omdbapi.com/?t=" + thing + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(err, response, body){
            if (!err && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            }
        })
    };
    if (command === 'my-tweets'){
        client.get('statuses/user_timeline', function(err, tweets, response){
            if(err) {console.log(err)};
            for (var i = 0; i < tweets.length; i++) {
                const recentTweets = tweets[i];
                
                console.log(recentTweets.created_at + ': ' + recentTweets.text)
            }
        })
    };
    if (command === 'spotify-this-song'){
        spotify.search({ type: 'track', query: thing }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            console.log('Artists: ' + data.tracks.items[0].album.artists[0].name )
            console.log('Album: ' + data.tracks.items[0].album.name ); 
            console.log('Song Title: ' + data.tracks.items[0].name)
            console.log(data.tracks.items[0].external_urls.spotify)
          });
    };
    if (command === 'do-what-it-says'){
        fs.readFile('random.txt', 'utf8', function(err, data){
            if (err){
               return console.log('Error occurred: ' + err)};
            var fileData = data.split(',')
            command = fileData[0];
            thing = fileData[1];
            liri()        
        })
    }
}


liri()