const clientData = require('./../data/clients');

module.exports = (app) => {
	return {
		index: (req, res) => {
			res.render('home/index', {
				data: {
					clients: clientData
				}
			});
		}	
	}	
}