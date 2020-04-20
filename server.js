//Install express server
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const app = express();

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};

app.use(express.static('./dist/ePortfolio'));

app.get('/*', function (req, res) {
  res.sendFile(path.join('ePortfolio', '/dist/ePortfolio/index.html'));
});

app.use(forceSSL());

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);
