const otherRoutes = require('./other');
const privateRoutes = require('./private');

const constructorMethod = (app) => {
  app.use('/', otherRoutes);
   app.use('/private', privateRoutes);

};

module.exports = constructorMethod;