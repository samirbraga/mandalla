module.exports = (app) => {
	let MobileDetect = require('is-mobile');
	return {
		index: (req, res) => {
			md = MobileDetect(req);
			res.render('contact/index', {md: md});
		}
	}
}
