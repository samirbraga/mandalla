module.exports = (app) => {
	const homeCtrl = app.controllers.home;

	app.get('/', homeCtrl.index);
	app.get('/print-establishments', homeCtrl.printEstablishments);
}
