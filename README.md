# HW8 LIRI NODE APP

## Installation 
* npm-install for initial download of dependent packages
* requires you to import your own spotify keys by creating .env file in below format.
![spotify keys](./imgs/spotifykeys.png "Spotify Keys Screenshot")

### Usage
* node liri.js [command] [search term(s)]
* ie: --> node liri.js concert-this red hot chili peppers

### Commands
* concert-this --> searches BandsinTown for upcoming concerts. Accepts search value(s) by Artist/Band name.
![concert-this-screenshot](./imgs/concert.png "Concert This")

* spotify-this --> searches Spotify for Song(s). Accepts search value(s) by song title and/or artist name.
![spotify-this-screenshot](./imgs/song.png "Spotify This")

* movie-this --> searches OMDB for movie(s). Accepts search value(s) by movie title.
![movie-this-screenshot](./imgs/movie.png "Movie This")

* random-[input] --> searches via random-[input].txt for random [input] to display. Valid inputs include song, movie or concert. 


### Technologies Used
* Node.JS 
* dotenv
* figlet
* axios
* moment
* Javascript ES6
* Spotify API
* BandsinTown API
* OMDB API

