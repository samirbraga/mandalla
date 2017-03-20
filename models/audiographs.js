module.exports = (app) => {
	let mongoose = require('mongoose');
	let db = require('./../libs/db_connect')(),
		  Schema = mongoose.Schema;

	let Audiograph = Schema({
		street_name: {
			type: String,
			required: true
		},
		instagram_link: {
			type: String,
			required: true
		},
		/*
		instagram_key: {
			type: String,
			required: true
		},*/
		instagram_image_url: {
			type: String,
			required: true
		},
		audio_file: {
			type: String,
			required: true
		},
		listen_count: {
			type: Number,
			required: true
		},
		created_time: {
			type: Number,
			required: true
		}
	});

	return db.model('audiographs', Audiograph);
};
