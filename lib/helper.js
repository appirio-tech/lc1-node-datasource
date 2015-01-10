/**
 * Helper library
 *
 * @author      spanhawk
 * @version     1.0
 */

var _ = require('lodash'),
  fse = require('fs-extra'),
  path = require('path'),
  Sequelize = require('sequelize');

/**
 * This method validates the configuration object
 * @param {Object}    config      object to validate
 * 
 */
exports.checkConfiguration = function(config) {
  // some very strict configuration checking
  if(_.isUndefined(config) || _.isUndefined(config.datasource)) {
    throw new Error('Invalid configuration');
  } else if(!_.isString(config.datasource.modelsDirectory)) {
    throw new Error('modelsDirectory should be a string value');
  } else if(!_.isString(config.datasource.pgURL)) {
    throw new Error('postgresql connection is invalid');
  }
};

/**
 * Init the datasource and assign to self
 * @param  {Object}     self      self reference.
 */
exports.init = function(self, config) {
  // reading config.
  var dbOptions = config.dbOptions || {};
  var sequelize = new Sequelize(postgresurl, dbOptions);

  // Add JSON and JSONB data type to Sequelize
  Sequelize.JSON = 'JSON';
  Sequelize.JSONB = 'JSONB';

  fse.readdirSync(__dirname + '/' + config.modelsDirectory).filter(function(file) {
    return ((file.indexOf('.' ) !== 0) && (file.slice(-3) === '.js'));
  }).forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, config.modelsDirectory, file));
    self[model.name] = model;
  });

  Object.keys(self).forEach(function(modelName) {
    if(this[modelName].options.hasOwnProperty('associate')) {
      this[modelName].options.associate(this);
    }
  });
  self.sequelize = sequelize;
  self.Sequelize = Sequelize;
};