module.exports = (app) => {
	const audiographsCtrl = app.controllers.audiographs;
	var Audiographs = app.models.audiographs;
/*
	const request = require('request');


	Audiographs.find({}, (err, audiographs) => {
		audiographs.forEach(audiograph => {
			const options = {
				url: 'https://api.instagram.com/oembed?url=' + audiograph.instagram_link,
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Accept-Charset': 'utf-8'
				}
			}

			request(options, (err, response, body) => {
				var html = JSON.parse(body).html;
				var getTimeRegex = /(datetime)\=\"[^"]+\"/g;
				if(getTimeRegex.test(html)){
					timestamp = html.match(getTimeRegex)[0].split("=")[1].replace(/\"/g, '');
				}
				timestamp = new Date(timestamp).getTime()

				Audiographs.findOneAndUpdate({_id: audiograph._id}, {$set: {created_time: timestamp}}, (err, audiograph) => {	})

			})
		})
	})


*/
	app.get('/audiografias', audiographsCtrl.index);
}
