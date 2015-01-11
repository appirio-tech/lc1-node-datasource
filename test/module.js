/* jshint unused:false */
/**
 * This module contains codes for testing serenity-datasource module
 *
 * @version   0.0.1
 * @author    spanhawk
 */
'use strict';

var should = require('should');
var config = require('./config/config');
var serenityDatasource = require('../');
var _ = require('lodash');

/**
 * Test Challenge model CRUD operations
 */
describe('<Module Test>', function() {
  this.timeout(20000);
  describe('<Initiatization tests>', function() {

    describe('<Congifuration validation>', function() {
      it('should throw an error for undefined config', function(done) {
        try {
          var datasource = new serenityDatasource();
        } catch(e) {
          should.exist(e);
          done();
        }
      });

      it('should throw an error for empty config', function(done) {
        try {
          var datasource = new serenityDatasource({});
        } catch(e) {
          should.exist(e);
          done();
        }
      });

      it('should throw an error if invalid modelsDirectory specified', function(done) {
        var invalidConfig = _.cloneDeep(config);
        delete invalidConfig.datasource.modelsDirectory;
        try {
          var datasource = new serenityDatasource(invalidConfig);
        } catch(e) {
          should.exist(e);
          done();
        }
      });

      it('should throw an error if modelsDirectory is not an string', function(done) {
        var invalidConfig = _.cloneDeep(config);
        invalidConfig.datasource.modelsDirectory = 1;
        try {
          var datasource = new serenityDatasource(invalidConfig);
        } catch(e) {
          should.exist(e);
          done();
        }
      });

      it('should throw an error if invalid pgURL specified', function(done) {
        var invalidConfig = _.cloneDeep(config);
        delete invalidConfig.datasource.pgURL;
        try {
          var datasource = new serenityDatasource(invalidConfig);
        } catch(e) {
          should.exist(e);
          done();
        }
      });

      it('should be successfully initiatized if valid config', function(done) {
        try {
          var datasource = new serenityDatasource(config);
          done();
        } catch(e) {
          should.not.exist(e);
          done();
        }
      });

    });

    describe('<Create/Find entity in sample table>', function() {
      var datasource;
      var TestTable;
      var id;
      var data = {
        name: 'topcoder test',
        email: 'topcoder@topcoder.com',
        description: 'Some very long text string'
      };
      before(function() {
        datasource = new serenityDatasource(config);
        TestTable = datasource.TestTable;
      });
      it('should be able to create a record in database', function(done) {
        var TestTable = datasource.TestTable;
        TestTable.create(data).success(function(savedEntity) {
          savedEntity.name.should.equal(data.name);
          var temp = savedEntity.id.should.be.a.Number;
          id = savedEntity.id;
          done();
        }).error(function(error) {
          should.not.exist(error);
          done();
        });
      });

      it('should be able to find the created entity', function(done) {
        TestTable.find(id).success(function(entity) {
          entity.name.should.equal(data.name);
          entity.email.should.equal(data.email);
          done();
        }).error(function(error) {
          should.not.exist(error);
          done();
        });
      });
    });

  });
});