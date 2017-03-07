module.exports = (app) => {
  var dataCtrl = app.controllers.data;
	app.get('/data', dataCtrl.response);
}
