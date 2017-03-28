const clientData = require('./../data/clients'),
			componentsData = require('./../data/components'),
			request = require('request'),
			MobileDetect = require('is-mobile');

module.exports = (app) => {
	let Establishments = app.models.establishments;

	return {
		index: (req, res) => {
			let md = MobileDetect(req);

      // const options = {
      //   url: 'https://www.instagram.com/p/BRk-PQ7Dv1d/embed/captioned/?cr=1&v=7',
      //   method: 'GET',
      //   headers: {
      //     'Accept': 'text/html',
      //     'Accept-Charset': 'utf-8'
      //   }
      // }
			// request(options, (er, response, body) => {
			// 	console.log(body)
				var date = new Date();
				let dateResponse = {
					full: date,
					year: date.getFullYear(),
					month: (+date.getMonth()) >= 10 ? (+date.getMonth()) : "0" + (+date.getMonth()),
					day: (+date.getDay()) >= 10 ? (+date.getDay()) : "0" + (+date.getDay()),
					hours: (+date.getHours()) >= 10 ? (+date.getHours()) : "0" + (+date.getHours()),
					minutes: (+date.getMinutes()) >= 10 ? (+date.getMinutes()) : "0" + (+date.getMinutes()),
					seconds: (+date.getSeconds()) >= 10 ? (+date.getSeconds()) : "0" + (+date.getSeconds())
				}

				res.render('home/index', {


					data: {
						clients: clientData,
						components: componentsData,
						// data: body,
						fulldate: dateResponse
					},
					md: md
				});
			// })
		},
		printEstablishments: (req, res) => {
			var autoPrint = false;
			if(req.query.for == "initMap")
				autoPrint = true;

			Establishments.find({}, (err, establishmentsList) => {
				if(!err){
					res.render('home/print-establishments', {
						data: {
							establishments: establishmentsList
						},
						autoPrint: autoPrint
					});
				}
			});
		}
	}
}
