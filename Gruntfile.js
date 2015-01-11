'use strict';

var paths = {
  js: ['*.js', 'test/**/*.js','**/*.js', '!node_modules/**']
};
var config = require('./test/config/config');

module.exports = function(grunt) {
  var databaseUrl = config.datasource.pgURL;
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: {
        src: paths.js,
        options: {
          jshintrc: true
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },
    migrate: {
      options: {
        env: {
          DATABASE_URL: databaseUrl   // the databaseUrl is resolved at the beginning based on the NODE_ENV, this value injects the config in the database.json
        },
        'migrations-dir': 'test/config/schema-migrations', // defines the dir for the migration scripts
        verbose: true   // tell me more stuff
      }
    },
    env: {
      test: {
        NODE_ENV: 'test'
      }
    }
  });

  //Load NPM tasks
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'validate']);
  //validate task.
  grunt.registerTask('validate', ['env:test', 'dbmigrate', 'mochaTest', 'jshint']);

  // db migrate. Currently only needed for testing
  grunt.registerTask('dbmigrate', 'db up all the applicable scripts', function () {
    grunt.task.run('migrate:up');
  });  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('dbdown', 'db down all the applicable scripts', function () {
    grunt.task.run('migrate:down');
  });
};