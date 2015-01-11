/**
 * Represent TestTable in the system.
 *
 * @version 0.0.1
 * @author spanhawk
 */
'use strict';

/**
* Defining TestTable model
*/
module.exports = function(sequelize, DataTypes) {

  var TestTable = sequelize.define('TestTable', {
    // primary key
    id: {
      type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true,
      get: function() {
        return parseInt(this.getDataValue('id'));
      }
    },
    name: {
      type: DataTypes.TEXT,      
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING(140),
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    description: DataTypes.TEXT
  }, {
    tableName: 'TestTable'
  });

  return TestTable;

};