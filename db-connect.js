var mongoose = require("mongoose");
module.exports = {
	connect: function(config){
		mongoose.connect(config.db, {user: config.dbUser, pass: config.dbPwd});
		mongoose.connection.on("error", function(){
			console.log("There was an error connecting to the database");
		});
		mongoose.connection.once("open", function(){
			console.log("connected to " +config.db+" successfully!");
		});
	}
};