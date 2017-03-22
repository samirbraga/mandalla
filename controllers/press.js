module.exports = (app) => {
	return {
		index: (req, res) => {
			res.render('press/index', {});
		}
	}
}
