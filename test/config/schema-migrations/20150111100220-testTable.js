'use strict';

var async = require('async');

exports.up = function (db, callback) {
  async.series([
    // Test table
    db.runSql.bind(db,
      'CREATE TABLE "TestTable" ( ' +
        'id bigserial NOT NULL, ' +
        'name text NOT NULL, ' +
        'email character varying(140) NOT NULL, ' +
        'description text, ' +
        '"createdAt" timestamp with time zone NOT NULL, ' +
        '"updatedAt" timestamp with time zone NOT NULL ' +
      ');'),
    db.runSql.bind(db, 'ALTER TABLE ONLY "TestTable" ADD CONSTRAINT testtable_pkey PRIMARY KEY (id);')
  ], callback);
};

exports.down = function (db, callback) {
  async.series([
    db.dropTable.bind(db, 'TestTable')
  ], callback);
};
