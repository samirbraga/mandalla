const clientData = require('./../data/clients'),
			componentsData = require('./../data/components');
			establishmentsList = require('./../data/establishments');

module.exports = (app) => {
	return {
		index: (req, res) => {
			res.render('home/index', {
				data: {
					clients: clientData,
					components: componentsData
				}
			});
		},
		printEstablishments: (req, res) => {
			res.render('home/print-establishments', {
				data: {
					establishmentsList: establishmentsList
				}
			});
		}
	}
}
