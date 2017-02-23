const express = require('express'),
	    app = express(),
	    http = require('http'),
	    load = require('express-load'),
	    favicon = require('serve-favicon'),
	    path = require('path'),
      ejs = require('ejs'),
      minifyHTML = require('express-minify-html');

ejs.delimiter = '$';

const server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

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

app.use('/public', express.static(path.join(__dirname, 'public')));

// cookie and session setup
app.disable('x-powered-by');

load('controllers').
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


const port = Number( process.env.PORT || 2000 );
server.listen(port, () => {
	console.log(`Mandalla Comunicação running in port ${port}`);
});
