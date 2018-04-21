require("dotenv").config();
const request = require("request");
const keys = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api')



const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);



