//Install express server
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var pdfMakePrinter = require('./node_modules/pdfmake');
const app = express();

app.use(express.static(path.join('ePortfolio', 'public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));

function createPdfBinary(pdfDoc, callback) {

  var fontDescriptors = {
    MyriadPro: {
      normal: path.join('ePortfolio', '..', 'examples', '/fonts/Myriad Pro Regular.ttf'),
      bold: path.join('ePortfolio', '..', 'examples', '/fonts/Myriad Pro Bold.ttf'),
      italics: path.join('ePortfolio', '..', 'examples', '/fonts/Myriad Pro Italic.ttf'),
      bolditalics: path.join('ePortfolio', '..', 'examples', '/fonts/Myriad Pro Bold Italic.ttf')
    }
  };

  var printer = new pdfMakePrinter(fontDescriptors);

  var doc = printer.createPdfKitDocument(pdfDoc);

  var chunks = [];
  var result;

  doc.on('data', function (chunk) {
    chunks.push(chunk);
  });
  doc.on('end', function () {
    result = Buffer.concat(chunks);
    callback('data:application/pdf;base64,' + result.toString('base64'));
  });
  doc.end();

}

app.post('/pdf', function (req, res) {
  eval(req.body.content);

  createPdfBinary(dd, function (binary) {
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

app.use(express.static('./dist/ePortfolio'));

app.get('/*', function (req, res) {
  res.sendFile(path.join('ePortfolio', '/dist/ePortfolio/index.html'));
});
app.all('*', (req, res) => {
  res.status(200).sendFile('ePortfolio' + '/dist/ePortfolio/index.html');
});
app.use(forceSSL());

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);
