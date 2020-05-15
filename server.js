//Install express server
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var pdfmake = require('./index');
const app = express();
app.use(express.static('./dist/ePortfolio'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));

function createPdfBinary(docDefinition) {

  var fonts = {
    MyriadPro: {
      normal: path.join('./dist/ePortfolio/assets/examples/fonts/Myriad Pro Regular.ttf'),
      bold: path.join('./dist/ePortfolio/assets/examples/fonts/Myriad Pro Bold.ttf'),
      italics: path.join('./dist/ePortfolio/assets/examples/fonts/Myriad Pro Italic.ttf'),
      bolditalics: path.join('./dist/ePortfolio/assets/examples/fonts/Myriad Pro Bold Italic.ttf')
    }
  };
  pdfmake.setFonts(fonts);

  var pdf = pdfmake.createPdf(docDefinition);
  return pdf.getDataUrl();
}

app.post('/pdf', function (req, res) {
  eval(req.body.content);

  createPdfBinary(dd).then(function (binary) {
    res.contentType('application/pdf');
    res.send(binary);
  }, function (error) {
    res.send('ERROR:' + error);
  });
});

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


app.get('/*', function (req, res) {
  res.sendFile(path.join('ePortfolio', '/dist/ePortfolio/index.html'));
})
app.use(forceSSL());

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);
