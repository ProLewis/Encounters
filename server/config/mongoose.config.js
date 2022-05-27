const mongoose = require('mongoose');

module.exports = (DB) => {
	mongoose.connect(`mongodb://localhost/${DB}`)
		.then(() => console.log("Established a connection to the database"))
		.catch(err => console.log("Something went wrong when connecting to the database", err));
}

