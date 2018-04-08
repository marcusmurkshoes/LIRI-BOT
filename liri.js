//Required Variables
var processs = process.argv[2];

var request = require('request');

var keys = require("./keys.js");

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var fs = require('fs');

// Where the Functions live

// Logic For Twitter------------------------------------------------------------

 function getMyTweets() {
var client = new Twitter(keys.twitterKeys);
 
var params = {screen_name: 'Alias_Account__'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);
    for(var i = 0; i < tweets.length; i++) {
    	console.log(tweets[i].created_at);
    	console.log('');
    	console.log(tweets[i].text);
    }
  }
});
}
// End of Logic for Twitter-------------------------------------------------------

//OMDB Movie Logic-----------------------------------------------------------------

var getMovie = function(movieName) {
//Requesting the information from the API
request('http://www.omdbapi.com/?t=' + movieName + '&apikey=a47e75cd', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  var jsonData = JSON.parse(body);
//Parsing the information so its more readable
  console.log('Title: ' + jsonData.Title);
  console.log('Year: ' + jsonData.Year);
  console.log('Ratings: ' + jsonData.Ratings);
  console.log('IMDB Rating: ' + jsonData.imdbRating);
  console.log('Country: ' + jsonData.Country);
  console.log('Language: ' + jsonData.Language);
  console.log('Plot: ' + jsonData.Plot);
});
}
// End of OMDB Movie Logic-----------------------------------------------------------

// Do What It Says Function----------------------------------------------------------

var doWhatItSays = function() {
  //Saying If the .txt file has one or two parameters in the array and using the choose function to find the cases in the switch case
  fs.readFile('random.txt', 'utf-8', function(err, data) {
    if (err) throw err;

    var dataArr = data.split(',');

    if(dataArr.length === 2) {
      choose(dataArr[0], dataArr[1]);
    } else if(dataArr.length === 1) {
      choose(dataArr[0]);
    }

  });
}

// End of Do What It Says Function-------------------------------------------------


//Switch Statments-----------------------------------------------------------------

var choose = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
		getMyTweets();
    break;
    case 'spotify-this-song' :
    getMeSpotify(functionData);
		break;
    case 'movie-this' :
    getMovie(functionData);
    break;
    case 'do-what-it-says' :
    doWhatItSays();
		default :
		console.log("LIRI is not familar with those commands..");
	}
}
// End of Switch Statements---------------------------------------------------------


// Functions That Input The Arguments Or Commands Typed In---------------------------
function runThis(argOne, argTwo) {
	choose(argOne, argTwo);

}

runThis(process.argv[2], process.argv[3]);

// End of process.argv Functions

// Spotify Logic--------------------------------------------------------------------------

var getArtistNames = function(artist) {
  return artist.name;
}


 function getMeSpotify(songName) {

var spotify = new Spotify({
  id: '822f83b834df4f9e92d49003037f0edd',
  secret: '8e5c52e2a08a4cea9abac1fbaeaade3f'
});

spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
// for loop that loops through the information on the artist and 
var songs = data.tracks.items;
  for(var i = 0; i < songs.length; i++) {
    console.log[i];
    console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
    console.log('song name: ' + songs[i].name);
    console.log('preview song: ' + songs[i].preview_url);
    console.log('album: ' + songs[i].album.name);
    console.log('------------------------------------------------------------------');
    // console.log(data.tracks.items);
  }
 

});

}

// End of Logic for Spotify------------------------------------------------------------------
