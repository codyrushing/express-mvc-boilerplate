module.exports = function(app){
	var files = ["main"];
	
	app.use(function(req, res, next){
	  	res.locals.path = req.path;
	  	res.locals.navPages = [{
	  		url: "/",
	  		name: "Home"
	  	},{
	  		url: "/foo",
	  		name: "Foo"
	  	},
	  	{
	  		url: "/bar",
	  		name: "Bar"
	  	},
	  	{
	  		url: "/snarf",
	  		name: "Snarf"
	  	}];
	  	next();
	});

	files.forEach(function(file){
		require("./" + file)(app);
	});
};
