const request = require('request');

module.exports = (app) => {
	return {
		response: (req, res) => {
      var query = req.query;
      if(query.q == "date"){

        var date = new Date();

        var dateResponse = {
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

				var userId = "1537761915";
				var accessToken = "1537761915.bd5e6a3.18d6c0f38e634dc182551439d48106ba";
				var url = "https://api.instagram.com/v1/users/" + userId + "?access_token=" + accessToken;

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
			}
    }
	}
}
