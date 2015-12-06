/**
 * User
 * @description :: Model for storing jukeboxes
 */

module.exports = {
  schema: true,
  attributes:{
    adminId: {
      model: 'User',
      required: true,
      type: 'integer'
    },
    placeId: {
      model: 'Place',
      required: true,
      type: 'string'
    },
    expirationDate: {
      type: 'date',
    },
    startTime: {
      type: 'string',
      size: 5,
      required: true,
    },
    endTime: {
      type: 'string',
      size: 5,
      required: true,
    },
    name: {
      type: 'string',
      required: true
    },
    lists:{
      collection: 'lists',
      via: 'jukeboxes'
    },
    songs: {
      collection: 'song',
      via: 'jukeboxes'
    }
  },
};