//inporting dotenv package
require("dotenv").config();

//global variables
const keys = require("./keys.js");
const moment = require("moment");
const fs = require("fs");
const axios = require("axios");
const figlet = require("figlet");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const divider = "\n------------------------------------------------------------\n\n";

//capture user inputs into variables
let inputFunction = process.argv[2];
let nodeArgs = process.argv
let inputArgument = "";

//for loop for multi user inputs
for (let i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    inputArgument = inputArgument + "+" + nodeArgs[i];
  }
  else {
    inputArgument += nodeArgs[i];
  }
}

//concert search function
const runConcertSearchApp = (inputArgument) => {
//figlet module for ascii text generation
	figlet('Concert This!', (err, data) => {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});
		//set default search value for no user input
		if (inputArgument === "") {
			inputArgument = "Red Hot Chili Peppers";
		}
	let queryUrl = "https://rest.bandsintown.com/artists/" + inputArgument + "/events?app_id=codingbootcamp";
	axios.get(queryUrl)
	.then(
		(response) => {
			// deprecated code for edge case
			// if (response.data === undefined ) {
			// 	console.log("No results found. Please try again");
			// 	return;
			// }
			for (let i = 0; i < response.data.length; i++){
			console.log(divider);
			//deprecated code / refactored
			// console.log("---RESULT #: " + (i+1) + " ---")
 		// 	console.log("Name of venue: " + response.data[i].venue.name);
			// console.log("Location of venue: " + response.data[i].venue.city);
			// console.log("Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
			// console.log("Artist Lineup: " + response.data[i].lineup);
			let responseData = [
			"---RESULT #: " + (i+1) + " ---",
			"Name of venue: " + response.data[i].venue.name,
			"Location of venue: " + response.data[i].venue.city,
			"Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"),
			"Artist Lineup: " + response.data[i].lineup
			].join("\n\n");
			console.log(responseData);
			//logging response
			fs.appendFile("log.txt", responseData + divider, (err) => {
				if (err) throw err;
			});
		}
		//edge case for error/invalid search term
		}).catch((error) => {
    	 console.log("Error. No results found. Please try again.");
  });
}

//movie search function
const runMovieSearchApp = (inputArgument) => {

	figlet('Movie This!', (err, data) => {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});	
		//default search value
		if (inputArgument === "") {
			inputArgument = "Mr. Nobody";
		}
		let queryUrl = "http://www.omdbapi.com/?t=" + inputArgument + "&y=&plot=short&apikey=trilogy";
		axios.get(queryUrl)
		.then(
			(response) => {
				//edge case for no results
			if (response.data.Response === 'False') {
				console.log ("No results found. Please try again.");
				return;
			}
			let responseData = [
			"Title of the movie: " + response.data.Title,
			"Year of Release: " + response.data.Year,
			"IMDB Rating :" + response.data.imdbRating,
			"RottenTomatoes Rating: " + response.data.Ratings[1].Value,
			"Original Filmed Language: " + response.data.Language,
			"Sypnosis: " + response.data.Plot,
			"Top Billed Cast: " + response.data.Actors
			].join("\n\n");
			console.log(responseData);
			//deprecated code / refactored
			// console.log("Title of the movie: " + response.data.Title);
			// console.log("Year of Release: " + response.data.Year);
			// console.log("IMDB Rating :" + response.data.imdbRating);
			// console.log("RottenTomatoes Rating: " + response.data.Ratings[1].Value);
			// console.log("Original Filmed Language: " + response.data.Language);
			// console.log("Sypnosis: " + response.data.Plot);
			// console.log("Top Billed Cast: " + response.data.Actors);		

			//logging response
			fs.appendFile("log.txt", responseData + divider, (err) => {
				if (err) throw err;
			});
			}).catch((error) => {
			console.log(error);
		});
}

//song search function
const runSongSearchApp = (inputArgument) => {
	figlet('Spotify This!', (err, data) => {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});
	//default search value
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
 		//edge case for no results
 	if (data.tracks.total  === 0) {
 		console.log("No results found. Please try again.");
 		return;
 	}
 	let results = data.tracks.items;
 	console.log("---SONG INFO---");
 	for (let i = 0; i < results.length; i++){
 	 console.log(divider);
 	 let responseData = [
 	 "---RESULT #: " + (i+1) + " ---",
 	 "Artist/Band: " + results[i].artists[0].name,
 	 "Song name: " + results[i].name,
 	 "Preview song url: " + results[i].preview_url,
 	 "Album name: " + results[i].album.name
 	 ].join("\n\n");
 	 console.log(responseData);
 	 //logging
 	 fs.appendFile("log.txt", responseData + divider, (err) => {
				if (err) throw err;
	 });
	 //deprecated code / refactored
 	 // console.log("---RESULT #: " + (i+1) + " ---");
   //   console.log("Artist/Band: " + results[i].artists[0].name); 
   //   console.log("Song name: " + results[i].name);
 	 // console.log("Preview song url: " + results[i].preview_url); 		
 	 // console.log("Album name: " + results[i].album.name);
 	  }
 	}
  )
}

//random functions
const randomSong = () => {
	fs.readFile("random-song.txt", "utf8", (err,data) => {
		if(err){
			return console.log(err);
		}
		let dataArray = data.split(",");
		userInputs(dataArray[0], dataArray[1]);
	})
}

const randomMovie = () => {
	fs.readFile("random-movie.txt", "utf8", (err,data) => {
		if(err){
			return console.log(err);
		}
		let dataArray = data.split(",");
		userInputs(dataArray[0], dataArray[1]);
	})
}

const randomConcert = () => {
	fs.readFile("random-concert.txt", "utf8", (err,data) => {
		if(err){
			return console.log(err);
		}
		let dataArray = data.split(",");
		userInputs(dataArray[0], dataArray[1]);
	})
}

//user input choices
const userInputs = (inputFunction, inputArgument) => {
	switch (inputFunction) {
		case "concert-this":
			runConcertSearchApp(inputArgument);
			break;
		case "spotify-this":
			runSongSearchApp(inputArgument);
			break;
		case "movie-this":
			runMovieSearchApp(inputArgument);
			break;
		case "random-song":
			randomSong();
			break;
		case "random-movie":
			randomMovie();
			break;
		case "random-concert":
			randomConcert();
			break;	
		default:
			console.log("Not a recognized command. Please consult the readme for list of valid commands.")				
	}
}
//running function
userInputs(inputFunction,inputArgument);


