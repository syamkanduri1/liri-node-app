var fs = require("fs");
require("dotenv").config();
var Spotify = require('node-spotify-api');
var request = require("request");
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);

var cmdInput = process.argv[2];
var nameInput;

// set queryURL parameter depending on values passed (or not!)

if (process.argv.length === 3 && cmdInput === "movie-this"){
  nameInput = "Mr. Nobody.";
  movieThis(nameInput);
}
else if (process.argv.length === 3 && cmdInput === "spotify-this-song"){
  nameInput = "The Sign";
  spotifyThis(nameInput);
}
else if (process.argv.length === 3 && cmdInput === "do-what-it-says"){
  doWhatItSays();
}
if (process.argv.length === 4){
  nameInput = process.argv[3];
}
if (process.argv.length === 4 && cmdInput === "movie-this"){
  movieThis(nameInput);
}
if (process.argv.length === 4 && cmdInput === "concert-this"){
  concertThis(nameInput);
}
if (process.argv.length === 4 && cmdInput === "spotify-this-song"){
  spotifyThis(nameInput);
}


function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function(err, data) {
    var fileContents =[];
    if (err) {
      return console.log(err);
    }
    fileContents = data.split(",");
    cmdInput = fileContents[0];
    nameInput = fileContents[1];
    spotifyThis(nameInput);
  });
}

function spotifyThis(inputParam){
    //console.log ("inputParam = "+ inputParam);
    spotify.search({ type: 'track', query: inputParam }, function(err, data){
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     // var myJSON = JSON.stringify(data,null,2);
      var track = data.tracks.items[0];
      console.log("\n-------------------------\n");
      console.log("Artist Name= "+ track.album.artists[0].name);
      console.log("\n-------------------------\n");
      console.log("URL= "+ track.album.artists[0].uri);
      console.log("\n-------------------------\n");
      
    })
}

function concertThis(inputParam){
    var queryUrl = "https://rest.bandsintown.com/artists/" + inputParam.replace(" ","+") + "/events?app_id=codingbootcamp";
    
    request(queryUrl, function(error, response, body) {
  
      if (!error && response.statusCode === 200) {
        console.log("\n-------------------------\n");
        console.log("body is: ",body);
        console.log("\n-------------------------\n");
       }
    });
}

function movieThis(inputParam){
    var queryUrl = "http://www.omdbapi.com/?t=" + inputParam + "&y=&plot=short&apikey=40e9cece";
    request(queryUrl, function(error, response, body) {

      if (!error && response.statusCode === 200) {
        console.log("\n-------------------------\n");
        console.log("Movie title is: " + JSON.parse(body).Title);
        console.log("\n-------------------------\n");
        console.log("Released date is: " + JSON.parse(body).Released);
        console.log("\n-------------------------\n");
        console.log("IMDB rating is: " + JSON.parse(body).Ratings[0].Value);
        console.log("\n-------------------------\n");
        console.log("RottenTomotoes rating is: " + JSON.parse(body).Ratings[1].Value);
        console.log("\n-------------------------\n");
        console.log("Country / Countries produced: " + JSON.parse(body).Country);
        console.log("\n-------------------------\n");
        console.log("Language: " + JSON.parse(body).Language);
        console.log("\n-------------------------\n");
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("\n-------------------------\n");
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("\n-------------------------\n");
      }
    });
} 
