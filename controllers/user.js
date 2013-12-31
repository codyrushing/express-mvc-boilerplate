module.exports = function(app){
	app.get("/", function(req, res, next){
		res.json({
			"success": true
		});
	});
};