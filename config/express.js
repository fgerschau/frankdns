const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const log4js = require('log4js');

const logger = log4js.getLogger('Access');


module.exports = (() => {
  const app = express();

  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, '../app/views'));
  app.set('view engine', 'pug');
  app.use(favicon('public/images/computer.svg'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../public')));

  app.use(log4js.connectLogger(logger, { level: 'auto', format: ':method :url :status - :response-time ms' }));


  app.use(errorHandler());

  return app;
})();
