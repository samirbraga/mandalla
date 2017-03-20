const express = require('express'),
	    app = express(),
	    http = require('http'),
	    load = require('express-load'),
	    favicon = require('serve-favicon'),
	    path = require('path'),
      ejs = require('ejs'),
      cors = require('cors'),
			cookieParser = require('cookie-parser'),
			expressSession = require('express-session'),
      helmet = require('helmet'),
      bodyParser = require('body-parser'),
      minifyHTML = require('express-minify-html');

ejs.delimiter = '$';

global.rootPath = __dirname;

const server = http.createServer(app);

//security
app.use(cors());
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const KEY = 'ruasbiograficas.sid',
	    SECRET = 'ruasbiograficas1234';
let cookie = cookieParser(SECRET),
		store = new expressSession.MemoryStore(),
		sessOpts = {
			secret: SECRET,
			name: KEY,
			store: store,
			resave: true,
			saveUninitialized: true
		},
		session = expressSession(sessOpts);

app.use(cookie);
app.use(session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(favicon(path.join(__dirname, 'public/images/favicon/', 'favicon.ico')));

/*
app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: false,
        removeAttributeQuotes:     false,
        removeEmptyAttributes:     true,
        minifyJS:                  true,
        minifyCSS:                 true
    }
}));
*/
app.use('/public', express.static(path.join(__dirname, 'public')));

// cookie and session setup
app.disable('x-powered-by');

load('models').
	then('controllers').
  	then('routes').
			into(app);

// Middlewares
app.use((req, res, next) => {
    res.end('not-found/index');
    next();
});
app.use((req, res, next) => {
    res.end('500 - Server Error');
    next();
});

const port = Number( process.env.PORT || 7000 );
server.listen(port, () => {
	console.log(`Ruas Biográficas running in port ${ (function(){ return port})() }`);
});

module.exports = app;
