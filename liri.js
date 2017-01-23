//require twitter, spotify, request, fs
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");
var fs = require('fs');

var command = process.argv[2];
var movieName = "";
var songName ="";
var nodeArgs = process.argv;

//node liri.js twitter
if (command === "my-tweets") {
    console.log("---------Twitter---------");
    myTweets();

//node liri.js spotify
//take in the command line arguments nodeArgs = process.argv;
//var i=3 will capture all the words in the address 
}else if (command === "spotify-this-song"){
    console.log("---------Spotify---------");
    for (var i=3; i<nodeArgs.length; i++){
    	if (i>3 && i< nodeArgs.length){
    		songName = songName + " " + nodeArgs[i];
    	}else {
    	    songName = songName + nodeArgs[i];
    	}
    }
    spotifythis();
    
//node liri.js movie [Moonrise Kingdom]
}else if (command === "movie-this"){
    console.log("---------Movies---------");
    myMovies();
    
//node liri.js readit
}else if (command === "do-what-it-says"){
    console.log("---------Read random.txt---------");
    fs.readFile('random.txt', 'utf8', function(error, data){
       var thatFile = data.split(',');
       songName = thatFile[1];
       //console.log(songName);
       spotifythis();
    });
}

    // Do something with 'data' 

//spotify function
function spotifythis(){    
    spotify.search({ type: 'track', query: 'bitch better have my money'}, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
            var song = data.tracks.items[0];
            //console.log(song.name);
            if (song.artists.length > 1) {
                for (var i=0; i<song.artists[i]; i++) {
                    console.log(song.artists[i].name);
                }
            }else console.log("Artist: "+song.artists[0].name);
    
            console.log("Album: "+song.album.name);
            console.log(song.preview_url);
        }
    );
}

function myTweets(){
    var username = "go2girlsqrd";
    console.log("@" +username+" Twitter Timeline");
    var keys = require('./keys.js');
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret:keys.twitterKeys.access_token_secret
    });

    
    //get command for 20 twitter statuses from my timeline 
    client.get('statuses/user_timeline', 
        function(err, go2girlsqrdTweets) {
            if (err) {
                console.log(err);
    	        return;
            }
            for (var eachTweet in go2girlsqrdTweets) {
                var time = go2girlsqrdTweets[eachTweet].created_at;
                var tweet = go2girlsqrdTweets[eachTweet].text;
                var output = time + " || @"+ username + ": " + tweet;
    	        console.log(output);
            }
        }
    );
}

function myMovies(){
    var movieName = "";
    for (var i=3; i<nodeArgs.length; i++){
    	if (i>3 && i< nodeArgs.length){
    		movieName = movieName + "+" + nodeArgs[i];
    	}else {
    	    movieName = movieName + nodeArgs[i];
    	}
    }
    var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json&tomatoes=true';
    request(queryUrl, function(err, response, moviestuff) {
        
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
            console.log("Title: " + JSON.parse(moviestuff).Title);
            console.log("Actors: " + JSON.parse(moviestuff).Actors);
            console.log("Plot: " + JSON.parse(moviestuff).Plot);
            console.log("Year: " + JSON.parse(moviestuff).Year);
            console.log("Country: " + JSON.parse(moviestuff).Country);
            console.log("Language: " + JSON.parse(moviestuff).Language);
            console.log("IMDB Rating: " + JSON.parse(moviestuff).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(moviestuff).tomatoRating);
            console.log("URL: " + JSON.parse(moviestuff).tomatoURL);
    });
}
