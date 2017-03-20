module.exports = (app) => {
	const mailerCtrl = app.controllers.mailer;

	app.post('/send', mailerCtrl.index);
}
