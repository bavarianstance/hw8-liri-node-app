require("dotenv").config();

//global variables
const keys = require("./keys.js");
const moment = require("moment");
const fs = require("fs");
const axios = require("axios");
const spotifyApp = require("node-spotify-api");
const spotifySession = new spotifyApp(keys.spotifySession);

//capture user inputs
let inputFunction = process.argv[2];
let inputArgument = process.argv[3];

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

const runConcertSearchApp = (inputArgument) => {
	if (inputArgument === null) {
			inputArgument = "Mr. Nobody";
		}
	let queryUrl = "https://rest.bandsintown.com/artists/" + inputArgument + "/events?app_id=codingbootcamp";
	axios.get(queryUrl)
	.then(
		let response = () => {
			console.log("Title of the movie: " + response.data.Title);
			console.log("Year of Release: " + response.data.Year);
			console.log("IMDB Rating :" + response.data.imdbRating);
			console.log("RottenTomatoes Rating: " + response.data.Ratings[1].Value);
			console.log("Original Filmed Language: " + response.data.Language);
			console.log("Sypnosis: " + response.data.Plot);
			console.log("Top Billed Cast: " + response.data.Actors);
		});
}

