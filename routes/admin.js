module.exports = (app) => {
  let express = require("express");

	const adminCtrl = app.controllers.admin;

  const admin = express();

  app.use('/admin', admin);

  var checkMiddleware = (req, res, next) => {
    if(req.session.adminUser){
      next();
    }else{
      res.redirect('/admin/login');
    }
  }

  admin.get('/', adminCtrl.index);
  admin.get('/login', adminCtrl.loginPage);
  admin.get('/logout', adminCtrl.logout);
  admin.post('/login', adminCtrl.login);
  admin.post('/add-establishment', adminCtrl.addEstablishment);
  admin.delete('/remove-establishment/:id', adminCtrl.removeEstablishment);
  admin.post('/add-audio', adminCtrl.addAudio);
  admin.delete('/remove-audio/:id', adminCtrl.removeAudio);
  admin.post('/inc-audio-listen-count/:id', adminCtrl.incListenCount);
}
