/**
 * User
 * @description :: Model for storing votes per user
 */

module.exports = {
  schema: true,
  attributes:{
    userId: {
      model: 'User',
      required: true,
      type: 'integer'
    },
    jukeboxId: {
      model: 'Jukebox',
      required: true,
      type: 'string'
    },
    listId: {
      model: 'List',
      required: true,
      type: 'string'
    },
    songId: {
      model: 'Song',
      required: true,
      type: 'string'
    },
    placeId: {
      model: 'Place',
      required: true,
      type: 'string'
    },
    played: {
      type: 'boolean',
      defaultsTo: false
    },
    vote: {
      type: 'integer',
      defaultsTo: 1
    }
  },
};