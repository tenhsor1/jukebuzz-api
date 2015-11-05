/**
 * Default model configuration
 *
 * Unless you override them, the following properties will be included in each of your models.
 */

module.exports.models = {
  /**
   * Your app's default connection
   * @type {String}
   */
  connection: "mongo",

  /**
   * How and whether Sails will attempt to automatically rebuild the tables/collections/etc. in your schema
   * Available values is `safe`, `alter` or `drop`
   * @type {String}
   */
  migrate: 'safe',

  /**
   * This method adds records to the database
   *
   * To use add a variable 'seedData' in your model and call the
   * method in the bootstrap.js file
   */
  seed: function (callback) {
    var self = this;
    var modelName = self.adapter.identity.charAt(0).toUpperCase() + self.adapter.identity.slice(1);
    if (!self.seedData) {
      sails.log.debug('No data avaliable to seed ' + modelName);
      callback();
      return;
    }
    self.count().exec(function (err, count) {
      if (!err && count === 0) {
        sails.log.debug('Seeding ' + modelName + '...');
        if (self.seedData instanceof Array) {
          self.seedArray(callback);
        }else{
          self.seedObject(callback);
        }
      } else {
        sails.log.debug(modelName + ' had models, so no seed needed');
        callback();
      }
    });
  },
  seedArray: function (callback) {
    var self = this;
    var modelName = self.adapter.identity.charAt(0).toUpperCase() + self.adapter.identity.slice(1);
    self.createEach(self.seedData).exec(function (err, results) {
      if (err) {
        sails.log.debug(err);
        callback();
      } else {
        sails.log.debug(modelName + ' seed planted');
        callback();
      }
    });
  },
  seedObject: function (callback) {
    var self = this;
    var modelName = self.adapter.identity.charAt(0).toUpperCase() + self.adapter.identity.slice(1);
    self.create(self.seedData).exec(function (err, results) {
      if (err) {
        sails.log.debug(err);
        callback();
      } else {
        sails.log.debug(modelName + ' seed planted');
        callback();
      }
    });

  }
};
