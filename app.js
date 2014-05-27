var express = require("express"),
	app = express(),
	fs = require("fs"),
	config = require("./config")[app.settings.env];

/*
* Connect to database
* remove if not needed
*/
require("./db-connect").connect(config);

/* 
* Load all models and controllers
* remove if not needed, and you can also remove fs variable declaration above
*/
fs.readdirSync("./models").forEach(function(file){
	require("./models/" + file)(app);
});
fs.readdirSync("./controllers").forEach(function(file){
	require("./controllers/" + file)(app);
});

/* 
* Set Express settings (middleware and etc)
* see settings.js to add remove options
*/
require("./settings")(app, config);

/* 
* Start listening 
*/
app.listen(3000, function(){
	console.log("aaaaand, we're off");
});