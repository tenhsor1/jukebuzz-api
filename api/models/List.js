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
    name: {
      type: 'string',
      required: true
    },
    songs: {
      collection: 'song',
      via: 'lists'
    },
    jukeboxes: {
      collection: 'jukebox',
      via: 'lists'
    }
  },
};