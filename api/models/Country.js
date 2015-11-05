/**
 * Country
 * @description :: Model for consulting countries
 */

module.exports = {
  schema: true,
  connection: 'mysql',
  tableName: 'countries',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    abbr: {
      type: 'string',
      required: true
    },

    name: {
      type: 'string',
      required: true
    },

    states: {
      collection: 'state',
      via: 'countryId'
    }
  },
};
