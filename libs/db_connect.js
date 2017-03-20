module.exports = () => {
	let mongoose = require('mongoose');
	return mongoose.createConnection('mongodb://samirbraga1234:rb1719@ds137540.mlab.com:37540/ruas_biograficas');
};
