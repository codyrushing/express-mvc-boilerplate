var express = require("express");
	exphbs  = require('express3-handlebars');
	// mongoStore used for storing session in mongodb
	// mongoStore = require("connect-mongo")(require("connect"));

module.exports = function(app, config){

	/* 
	* Serve up files in the /public directory statically
	*/
	app.configure(function(){
		app.use("/public", express.static(__dirname+'/public'));
	});

	/* 
	* View setup
	* Set views path, template engine and turn off default layout so that we can use template inheritance instead
	*/
	var hbs = exphbs.create({
        defaultLayout: "main",
        extname: ".hbs",
        partialsDir: 'views/partials/', // same as default, I just like to be explicit
        layoutsDir: "views/layouts/" // same as default, I just like to be explicit
	});

	// our partials will need access to partials
	hbs.loadPartials(function(err, partials){
		hbs.handlebars.partials = partials;
		require("./public/js/helpers").register(hbs.handlebars);
	});

	app.engine('hbs', hbs.engine);
	app.set('view engine', 'hbs');

	/*
	* dev configuration
	*/
	app.configure('development', function() {
	    app.use(express.logger('dev'));
	    app.use(express.errorHandler({
	        dumpExceptions: true,
	        showStack: true
	    }));
	    // beautifies all output - possibly turn off on production
		// app.locals.pretty = true;
	});

	/*
	* production configuration
	*/
	app.configure("production", function(){
		app.use(express.compress());		
	});

	// parse request body (JSON, or otherwise)
	app.use(express.bodyParser());

    /* 
    * Middleware 
    */
    // logger
	
	/* Session management */
	// TODO, update this using new module
	/*
		// cookieParser
		app.use(express.cookieParser()); 
		// mongoStore
	    app.use(express.session({
	    	secret: "someSecret",
	    	cookie: {maxAge: 1000*60*60*3},
	    	store: new mongoStore({
	    		url: config.db, 
	    		username: config.dbUser, 
	    		password: config.dbPwd, 
	    		stringify: false, 
	    		collection: "sessions"
	    	})
	    }));
	*/
    
    // router is required for all routs
    app.use(app.router);
    
    // global error handler
	app.use(function(err, req, res, next) {
		res.status(500);
	  	// handle error somehow
	  	res.end();
	});

};