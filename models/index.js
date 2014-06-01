module.exports = function(app){
	var files = ["user"];
	files.forEach(function(file){
		require("./" + file)(app);
	});
};