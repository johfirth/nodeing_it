require("dotenv").config();
const request = require("request");
const keys = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api')



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

    };
    if (command === 'spotify-this-song'){

    };
}

console.log (client)

liri()