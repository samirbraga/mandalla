module.exports = (app) => {
	let MobileDetect = require('is-mobile');
	return {
		index: (req, res) => {
			let md = MobileDetect(req);
			res.render('about/index', {md: md});
		}
	}
}
