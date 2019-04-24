module.exports = function(app) {
  // view renderer routes
  require('./views')(app);

  // json end point routes
  require('./apis')(app);

  // undandled routes
  app.all('*', (_, res) => res.status(404).send('Not Found'));
};
