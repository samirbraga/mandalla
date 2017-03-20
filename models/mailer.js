module.exports = (app) => {
	let mongoose = require('mongoose');
	let db = require('./../libs/db_connect')(),
      Schema = mongoose.Schema;

  let rbpw = Schema({
		word: {
			type: String,
			required: true
		}
	});

	return db.model('rbpw', rbpw);
};
