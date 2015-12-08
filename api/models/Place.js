/**
 * User
 * @description :: Model for storing places
 */

module.exports = {
  schema: true,
  attributes:{
    adminId: {
      model: 'User',
      required: true,
      type: 'integer'
    },
    name: {
      type: 'string',
      required: true
    },
    address:{
      type: 'string',
      required: true
    },

    zipcode:{
      type: 'string',
    },
    stateId: {
      model: 'state',
      required: true,
      type: 'integer'
    },
    latitude:{
      type: 'float'
    },
    longitude:{
      type: 'float'
    },
  },
};