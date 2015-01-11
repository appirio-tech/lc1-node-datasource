'use strict';
/**
 * Main script for serenity-datasource module.
 *
 * @author      spanhawk
 * @version     0.0.1
 *
 * This module build on top of sequelize ORM.
 * It reads all the sequelize schema definations from a directory and initialize each schema,
 * and exposes them as sequelize Models via a common object.
 *
 * A typical use case scenario
 *
 * var serenityDatasource = require('serenity-datasource');
 *
 * Create the datasource object using new operator passing in the congifuration object
 * configuration object should define datasource configuration inner object with a mandatory properties defined below
 * This directory path has to be relative to current process.pwd() path which is currently running.
 * Generally application would be run from the application root directory so in that case this path would be relative to
 * application root
 * 
 * NOTE: Path is case sensitive and must not end with slash
 * 
 * Errors from the init method has to be handled by the applicaiton
 *
 * Sample configuration object
 *
 * datasource: {
 *   modelsDirectory: <STRING> <REQUIRED> './api/models',
 *   pgURL: <STRING> <REQUIRED> 'postgres://postgres@localhost:5432/travis_ci_test',
 *   dbOptions: <OBJECT> <OPTIONAL> {}
 * }
 * modelsDirectory and pgURL is mandatory and dbOptions is optional
 * dbOptions specify additional postgresql db options as supported by sequelize
 *
 * Now all the *.js files would be read from models directory and each schema definition
 * is be exposed as Model object on main datasource object
 *
 * var serenityDatasource = require('serenity-datasource');
 * var config = require('config');
 * var datasource = new serenityDatasource(config);
 *
 * var Challenge = datasource.Challenge;
 *
 * Challenge is a sequelize model from Challenge schema defined in challenge.js file in models directory
 */

var helper = require('./lib/helper');

/**
 * Constructor
 * @param  {Object}     config    Configuration object
 */
var serenityDatasource = function(config) {
  // helper will throw error if configuration is not valid
  // Errors should be handled by applications
  helper.checkConfiguration(config);
  // if configuration is valid initialize the datasource
  helper.init(this, config);
};

module.exports = serenityDatasource;
