/**
 * Country
 * @description :: Model for consulting states
 */

module.exports = {
  schema: true,
  connection: 'mysql',
  tableName: 'states',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    name: {
      type: 'string',
      required: true
    },

    countryId: {
      type: 'integer',
      required: true,
      model: 'country',
      columnName: 'country_id'
    },

    users: {
      collection: 'user',
      via: 'stateId'
    }
  },
};
