module.exports = (app) => {
	let mongoose = require('mongoose');
	let db = require('./../libs/db_connect')(),
		  Schema = mongoose.Schema;

	let establishment = Schema({
		site: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		trading: {
			type: String,
			required: true
		},
		district: {
			type: String,
			required: true
		},
		street: {
			type: String,
			required: true
		},
		number: {
			type: String,
			required: true
		},
		latLng: {
			type: Array,
			required: true
		},
		logofile: {
			type: String,
			required: false
		}
	});

	return db.model('estabelecimentos', establishment);
};
