module.exports = (app) => {
	var MobileDetect = require('is-mobile');
	return {
		index: (req, res) => {
			let md = MobileDetect(req);
			res.render('exhibition/index', {md: md});
		}
	}
}
