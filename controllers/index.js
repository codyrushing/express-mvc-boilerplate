module.exports = function(app){
	var files = ["main"];
	files.forEach(function(file){
		require("./" + file)(app);
	});
};
