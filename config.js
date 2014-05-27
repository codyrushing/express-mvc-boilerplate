module.exports = {
	development: {
		db: "mongodb://localhost/dbName",
		dbUser: null,
		dbPwd: null
	},
	production: {
		db: "mongodb://localhost/dbName",
		dbUser: "dbUserName",
		dbPwd: "dbPassword"
	}
};
