module.exports = (app) => {
	const aboutCtrl = app.controllers.about;
	app.get('/sobre', aboutCtrl.index);
}
