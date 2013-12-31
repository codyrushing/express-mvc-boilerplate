var mongoose = require("mongoose"),
	UserSchema = new mongoose.Schema({
		email: {type: String, trim: true, required: true, unique: true},
		first_name: {type: String, trim: true, required: true},
		last_name: {type: String, trim: true},
		date_created: {type: Date, default: Date.now}
	});

// export out the model for use elsewhere
module.exports = mongoose.model("User", UserSchema);