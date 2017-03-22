module.exports = (app) => {
	const contactCtrl = app.controllers.contact;
	app.get('/contato', contactCtrl.index);
}
