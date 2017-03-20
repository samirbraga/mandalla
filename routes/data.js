module.exports = (app) => {
  var dataCtrl = app.controllers.data;
	app.get('/data', dataCtrl.response);
	app.get('/data/instapost/:key', dataCtrl.instapost);
	app.get('/ag/:filename', dataCtrl.sendAudio);
}
