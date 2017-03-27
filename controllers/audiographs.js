module.exports = (app) => {
	let Audiographs = app.models.audiographs;
	return {
		index: (req, res) => {
			Audiographs.find({}, (err, audiographs) => {
				audiographs.sort((a, b) => b.created_time - a.created_time);
				let renderOptions = {}
				if(err){
					renderOptions = {status: 'error', audiographs: [], search: {query: false}};
				}else{
					if(req.query.q){
						renderOptions = {status: 'error', audiographs: audiographs, search: {query: req.query.q}};
					}else{
						renderOptions = {status: 'error', audiographs: audiographs, search: {query: false}};
					}
				}
				res.render('audiographs/index', renderOptions);
			})
		}
	}
}

/*

	let query = req.query;
	let querySearch = {};
	let renderOptions = {};

	if(query.q){
		var searchKey = query.q;
		querySearch = {
			street_name: {
				$regex: new RegExp(searchKey, 'gi')
			}
		}
		renderOptions = {audiographs: audiographs, status: 'success', searchResult: }

		Audiographs.find(renderOptions, (err, audiographs) => {
			audiographs.sort((a, b) => b.created_time - a.created_time);

			if(err){
				res.render('audiographs/index', {status: 'error', audiographs: []});
			}else{
				res.render('audiographs/index', {audiographs: audiographs, status: 'success'});
			}
		})
	}else{

	}
	*/
