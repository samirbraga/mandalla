module.exports = (app) => {
	const exhibitionCtrl = app.controllers.exhibition;
	app.get('/exposicao', exhibitionCtrl.index);
}
