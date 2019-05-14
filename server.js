'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const config = require('config');
const HOST = config.get('HOST');
const PORT = config.get('PORT');
const ipaddress = HOST || '127.0.0.1';
const port = PORT || '3000';
const errorHandler = require('./errors/error_handler');
const cors = require('cors');
var swagger = require('swagger-tools');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/swagger.yaml');

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// add cors
app.use(cors());

swagger.initializeMiddleware(swaggerDocument, function (middleware) {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());
  
    // Provide the security handlers
    // app.use(middleware.swaggerSecurity({
    //   oauth2: function (req, def, scopes, callback) {
    //     // Do real stuff here
    //   }
    // }));
  
    // Validate Swagger requests
    app.use(middleware.swaggerValidator({
      validateResponse: true
    }));
  
    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter({useStubs: true, controllers: './controllers'}));
  
    // Serve the Swagger documents and Swagger UI
    //   http://localhost:3000/docs => Swagger UI
    //   http://localhost:3000/api-docs => Swagger document
    app.use(middleware.swaggerUi());

    app.use(function (err, req, res, next) {
      return errorHandler(err, req, res, next);
    });
});

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function (err)
{
// add log
	 process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function (reason, promise)
{
// add
    console.log(reason);
})

app.listen(port, ipaddress, function() {
    console.log(`Server running on http://${ipaddress}:${port}`);
});
