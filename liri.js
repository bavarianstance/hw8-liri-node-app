require("dotenv").config();

//global variables
const keys = require("./keys.js");
const moment = require("moment");
const fs = require("fs");
const axios = require("axios");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

//capture user inputs
let inputFunction = process.argv[2];
let nodeArgs = process.argv
let inputArgument = "";

for (let i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    inputArgument = inputArgument + "+" + nodeArgs[i];
  }
  else {
    inputArgument += nodeArgs[i];
  }
}

const runConcertSearchApp = (inputArgument) => {
	let queryUrl = "https://rest.bandsintown.com/artists/" + inputArgument + "/events?app_id=codingbootcamp";
	axios.get(queryUrl)
	.then(
		(response) => {
			console.log("--- CONCERT INFO ---")
			for (let i = 0; i < response.data.length; i++){
			console.log("---RESULT #: " + (i+1) + " ---")
 			console.log("Name of venue: " + response.data[i].venue.name);
			console.log("Location of venue: " + response.data[i].venue.city);
			console.log("Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
			console.log("Artist Lineup: " + response.data[i].lineup);
		}
		}).catch((error) => {
    	 console.log(error);
  });
}

const runMovieSearchApp = (inputArgument) => {
		if (inputArgument === "") {
			inputArgument = "Mr. Nobody";
		}
		let queryUrl = "http://www.omdbapi.com/?t=" + inputArgument + "&y=&plot=short&apikey=trilogy";
		axios.get(queryUrl)
		.then(
			(response) => {
			console.log("Title of the movie: " + response.data.Title);
			console.log("Year of Release: " + response.data.Year);
			console.log("IMDB Rating :" + response.data.imdbRating);
			console.log("RottenTomatoes Rating: " + response.data.Ratings[1].Value);
			console.log("Original Filmed Language: " + response.data.Language);
			console.log("Sypnosis: " + response.data.Plot);
			console.log("Top Billed Cast: " + response.data.Actors);			
		}).catch((error) => {
			console.log(error);
		});
}

const runSongSearchApp = (inputArgument) => {
	if (inputArgument === ""){
		inputArgument = "The Sign Ace of Base";
 	}
 	spotify.search(
 	{
 	 type: "track",
 	 query: inputArgument
 	},
 	(err, data) => {
 		if(err){
 			console.log(err);
 			return;
 		}
 	let results = data.tracks.items;
 	console.log("---SONG INFO---");
 	for (let i = 0; i < results.length; i++){
 	 console.log("---RESULT #: " + (i+1) + " ---");
     console.log("Artist/Band: " + results[i].artists[0].name); 
     console.log("Song name: " + results[i].name);
 	 console.log("Preview song url: " + results[i].preview_url); 		
 	 console.log("Album name: " + results[i].album.name);
 	  }
 	}
  )
}

const runRandomApp = () => {
	fs.readFile("random.txt", "utf8", (err,data) => {
		if(err){
			return console.log(err);
		}
		let dataArray = data.split(",");
		userInputs(dataArray[0], dataArray[1]);
	})
}

const userInputs = (inputFunction, inputArgument) => {
	switch (inputFunction) {
		case "concert-this":
			runConcertSearchApp(inputArgument);
			break;
		case "spotify-this-song":
			runSongSearchApp(inputArgument);
			break;
		case "movie-this":
			runMovieSearchApp(inputArgument);
			break;
		case "do-what-it-says":
			runRandomApp();
			break;
		default:
			console.log("Not a recognized command. Please consult the readme for list of valid commands.")				
	}
}

userInputs(inputFunction,inputArgument);


