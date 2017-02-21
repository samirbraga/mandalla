const clientData = require('./../data/clients'),
			componentsData = require('./../data/components');

module.exports = (app) => {
	return {
		index: (req, res) => {
			res.render('home/index', {
				data: {
					clients: clientData,
					components: componentsData
				}
			});
		}
	}
}
