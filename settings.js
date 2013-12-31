var express = require("express");
	// mongoStore used for storing session in mongodb
	// mongoStore = require("connect-mongo")(require("connect"));

module.exports = function(app, config){

	/* 
	* Serve up files in the /public directory statically
	*/
	app.configure(function(){
		app.use("./public", express.static(__dirname+'/public'));
	});

	/* 
	* Jade setup
	* Set views path, template engine and turn off default layout so that we can use template inheritance instead
	*/
    app.set('views', __dirname + './views');
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });

    // beautifies all output - possibly turn off on production
	app.locals.pretty = true;

    /* 
    * Middleware 
    */
    // logger
	app.use(express.logger());
	app.use(express.compress());
	
	// parse request body (JSON, or otherwise)
	app.use(express.bodyParser());
	
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