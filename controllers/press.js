module.exports = (app) => {
	MobileDetect = require('is-mobile');
	return {
		index: (req, res) => {
			md = MobileDetect(req);
			res.render('press/index', {md: md});
		}
	}
}
