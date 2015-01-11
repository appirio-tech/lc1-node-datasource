'use strict';

/**
 * Module test congiguration
 *
 * @author    spanhawk
 * @version   0.0.1
 */

var config = {
  datasource: {
    pgURL: 'postgres://postgres@localhost:5432/serenity-datasource-test',
    modelsDirectory: './test/models'
  }
};

module.exports = config;