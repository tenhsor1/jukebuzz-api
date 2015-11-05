/**
* Role.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  autoPK: false,
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    accessLevel: {
      type: 'integer',
      required: true
    },
    users: {
      collection: 'user',
      via: 'role'
    },
    id: {
      type: 'integer',
      primaryKey: true,
      //unique: true,
      required: true
    }
  },
  toJSON: function () {
    var obj = this.toObject();

    delete obj.createdAt;
    delete obj.updatedAt;

    return obj;
  },
  seedData: [
    {
      name: 'public',
      accessLevel: 0,
      id: 1
    },
    {
      name: 'admin',
      accessLevel: 1,
      id: 2
    },
    {
      name: 'super',
      accessLevel: 2,
      id: 3
    }
  ]
};

