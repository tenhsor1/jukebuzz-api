/**
 * User
 * @description :: Model for storing lists
 */

module.exports = {
  schema: true,
  attributes:{
    adminId: {
      model: 'User',
      required: true,
      type: 'integer'
    },
    title: {
      type: 'string',
      required: true
    },
    artist: {
      type: 'string',
      required: true
    },
    genre: {
      type: 'string'
    },
    lists: {
      collection: 'list',
      via: 'songs',
      dominant: true
    }
  },
};