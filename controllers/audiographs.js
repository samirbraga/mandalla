module.exports = (app) => {
	let Audiographs = app.models.audiographs;
	return {
		index: (req, res) => {
			Audiographs.find({}, (err, audiographs) => {
				audiographs.sort((a, b) => b.created_time - a.created_time);
				if(err){
					res.render('audiographs/index', {status: 'error', audiographs: []});
				}else{
					res.render('audiographs/index', {audiographs: audiographs, status: 'success'});
				}
			})
		}
	}
}
