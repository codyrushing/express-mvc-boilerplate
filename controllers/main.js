module.exports = function(app){
	app.get("/", function(req, res, next){
		res.render("home", {showTitle: true, partialName: "test1", arr: ["one", "two", "three", "four"] });
	});
};