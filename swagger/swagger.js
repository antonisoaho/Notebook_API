const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const opn = require('opn');

const setupSwagger = (app, PORT) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
  opn(`http://localhost:${PORT}/api-docs`);
};

module.exports = setupSwagger;
