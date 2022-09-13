const tvRoutes = require('./tvApi.js');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/', tvRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;
