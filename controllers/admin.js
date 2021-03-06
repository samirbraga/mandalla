module.exports = (app) => {
  let Establishments = app.models.establishments,
      AdminUser = app.models.adminUser,
      Audiographs = app.models.audiographs,
      MobileDetect = require('is-mobile');

  const multer1 = require('multer'),
        multer2 = require('multer'),
        fs = require('fs'),
        request = require('request'),
        path = require('path');

  let storageEstablishments = multer1.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './uploads/establishments-logo');
    },
    filename: (req, file, callback) => {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  let uploadEstablishments = multer1({ storage: storageEstablishments }).single('logo');

  let storageAudios = multer2.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './uploads/audiographs');
    },
    filename: (req, file, callback) => {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  let uploadAudios = multer2({ storage: storageAudios }).single('audiographs');


  const removeFile = path => {
    fs.stat(path, (err) => {
      if(err == null){
        fs.unlink(path);
      }
    })
  }

  // Nodejs encryption with CTR
  let crypto = require('crypto'),
      algorithm = 'aes-256-ctr',
      password = 'Rbfe3drR';

  /*
  function encrypt(text){
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
  */
  const decrypt = (text) => {
    let decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }

	return {
		index: (req, res) => {
      md = MobileDetect(req);
      if(req.session.adminUser){
			  res.render('admin/index', {md: md});
      }else{
        res.redirect('/admin/login')
      }
		},
		loginPage: (req, res) => {
      if(req.session.adminUser)
        res.redirect('/admin')
      else {
        var objParams = {loginStatus: ''}
        if(req.session.loginStatus == "fail"){
          objParams = {loginStatus: 'As informações não correspondem.'}
        }
        res.render('admin/login', objParams);
      }
		},
		login: (req, res) => {
      let body = req.body;
			AdminUser.findOne({})
			.select('username password')
			.exec(function(err, user){
        if(body.password == decrypt(user.password) && body.username == user.username){
          req.session.adminUser = user;
          req.session.loginStatus = "";
          res.redirect('/admin');
				} else {
          req.session.loginStatus = "fail";
          res.redirect('/admin');
				}
			});
		},
		logout: (req, res) => {
      req.session.destroy();
      res.redirect("/admin");
		},
    addEstablishment: (req, res) => {
      uploadEstablishments(req, res, function(err) {
        if(err) {
          console.log(err)
          return res.end("error");
        }else{
          var body = JSON.parse(JSON.stringify(req.body));
          body['latLng'] = body['latLng'].replace(/\s+/g, '').split(',').map(el => parseFloat(el));
          body['logofile'] = req.file.filename;
          Establishments.create(body, (err, establishments) => {
            if(err){
              console.log(err)
              res.end('error');
            }else{
              res.redirect('/admin');
            }
          })
        }
      })
    },
    removeEstablishment: (req, res) => {
      var id = req.params.id;

      Establishments.findById(id, (err, establishment) => {
        if(err){
          console.log(err)
          res.end('error');
        }else{
          establishment.remove();
          removeFile(rootPath + '/uploads/establishments-logo/' + establishment.logofile);
          res.end('success');
        }
      })
    },
    incListenCount: (req, res) => {
      var id = req.params.id;
      if(!req.session['ever_heard_' + id]){
        Audiographs.findOneAndUpdate({
          _id: id
        }, {
          $inc: {
            listen_count: 1
          }
        }, (err, audiograph) => {
          if(err){
            console.log(err)
            res.end('error');
          }else{
            req.session['ever_heard_' + id] = true;
            res.end('success');
          }
        });
      }else{
        res.end('Not logged.');
      }
    },
    addAudio: (req, res) => {
      if(req.session.adminUser){
        uploadAudios(req, res, function(err) {
          if(err) {
            console.log(err)
            return res.end("error");
          }else{

            let url = "http://api.instagram.com/oembed?url=" + req.body['instagram-link'];

            const options = {
              url: url,
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
              }
            }

            request(options, (err, response, body) => {
              body =  JSON.parse(body);

              var imageUrl = body.thumbnail_url;

              var timestamp = 1476358211000;
              var getTimeRegex = /(datetime)\=\"[^"]+\"/g;
              if(getTimeRegex.test(body.html)){
                timestamp = body.html.match(getTimeRegex)[0].split("=")[1].replace(/\"/g, '');
              }
              timestamp = new Date(timestamp).getTime();

              var body = {
                street_name: req.body['street-name'],
                instagram_link: req.body['instagram-link'],
                //instagram_key: key,
                instagram_image_url: imageUrl,
                audio_file: req.file.filename,
                listen_count: 0,
                created_time: timestamp
              }

              Audiographs.create(body, (err, audiograph) => {
                if(err){
                  console.log(err);
                  res.end('error');
                }else{
                  res.redirect('/admin');
                }
              });
            });
          }
        });
      }else{
        res.redirect('/admin/login')
      }
    },
    removeAudio: (req, res) => {
      var id = req.params.id;

      Audiographs.findById(id, (err, audiograph) => {
        if(err){
          console.log(err)
          res.end('error');
        }else{
          removeFile(rootPath + '/uploads/audiographs/' + audiograph.audio_file);
          audiograph.remove();
          res.end('success');
        }
      })
    }
	}
}
