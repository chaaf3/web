const bandsRoute = require('./bands');
const albumsRoute = require('./albums');

const constructorMethod = (app) => {
  app.use('/bands', bandsRoute);
  app.use('/albums', albumsRoute);

  app.use('*', (req, res) => {
    res.status(404);
  });
};

module.exports = constructorMethod;