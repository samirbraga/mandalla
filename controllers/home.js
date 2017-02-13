module.exports = (app) => {
	return {
		index: (req, res) => {
			res.render('home/index', {user: {name: "João Cabral Alves PM"}});
		}	
	}	
}