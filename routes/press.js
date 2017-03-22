module.exports = (app) => {
	const pressCtrl = app.controllers.press;
	app.get('/imprensa', pressCtrl.index);
}
