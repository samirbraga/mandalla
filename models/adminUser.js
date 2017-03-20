module.exports = (app) => {
	let mongoose = require('mongoose');
	let db = require('./../libs/db_connect')(),
		  Schema = mongoose.Schema;

	let AdminUser = Schema({
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	});

	return db.model('adminUser', AdminUser, 'adminUser');
};
