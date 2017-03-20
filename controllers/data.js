const request = require('request'),
			path = require('path');


module.exports = (app) => {
	let Establishments = app.models.establishments;
	let Audiographs = app.models.audiographs;

	return {
		response: (req, res) => {
      let query = req.query;

      if(query.q == "date"){

        let date = new Date();

        let dateResponse = {
          full: date,
          year: date.getFullYear(),
          month: (+date.getMonth()) >= 10 ? (+date.getMonth()) : "0" + (+date.getMonth()),
          day: (+date.getDay()) >= 10 ? (+date.getDay()) : "0" + (+date.getDay()),
          hours: (+date.getHours()) >= 10 ? (+date.getHours()) : "0" + (+date.getHours()),
          minutes: (+date.getMinutes()) >= 10 ? (+date.getMinutes()) : "0" + (+date.getMinutes()),
          seconds: (+date.getSeconds()) >= 10 ? (+date.getSeconds()) : "0" + (+date.getSeconds())
        }

        res.json(dateResponse);

      }else if(query.q == "insta"){

				let userId = "1537761915";
				let accessToken = "1537761915.bd5e6a3.18d6c0f38e634dc182551439d48106ba";
				let url = "https://api.instagram.com/v1/users/" + userId + "?access_token=" + accessToken;

				const options = {
					url: url,
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Accept-Charset': 'utf-8'
					}
				}

				request(options, (err, response, body) => {
					res.json(JSON.parse(body));
				});

			}else if(query.q == "establishments"){
				Establishments.find({}, (err, establishments) => {
					if(!err){
						res.json(establishments);
					}
				});
			}else if(query.q == "audiographs"){
				Audiographs.find({}, (err, audiographs) => {
					if(!err){
						res.json(audiographs);
					}
				});
			}
    },
		sendAudio: (req, res) => {
			res.sendFile(rootPath + '/uploads/audiographs/' + req.params.filename);
		},
		instapost: (req, res) => {
			var key = req.params.key;

			let userId = "1537761915";
			let accessToken = "1537761915.bd5e6a3.18d6c0f38e634dc182551439d48106ba";
			let url = "https://api.instagram.com/v1/media/shortcode/" + key + "?access_token=" + accessToken;

			const options = {
				url: url,
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Accept-Charset': 'utf-8'
				}
			}

			if(req.query.res == 'image'){
				request(options, (err, response, body) => {
					request(JSON.parse(body).data.images.thumbnail.url).pipe(res)
				});
			}else if(req.query.res == 'imageUrl'){
				request(options, (err, response, body) => {
					res.end(JSON.parse(body).data.images.thumbnail.url);
				});
			}else if(req.query.res == 'data'){
				request(options, (err, response, body) => {
					res.json(JSON.parse(body));
				});
			}else{
				res.end();
			}
		}
	}
}
