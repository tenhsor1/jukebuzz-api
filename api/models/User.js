/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
  schema: true,

  attributes: {
    password: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    firstName: {
      type: 'string',
      defaultsTo: '',
      required: true
    },

    lastName: {
      type: 'string',
      defaultsTo: ''
    },

    photo: {
      type: 'string',
      defaultsTo: '',
      url: true
    },

    socialProfiles: {
      type: 'object',
      defaultsTo: {}
    },

    role: {
      model: 'role',
      required: true
    },

    stateId: {
      model: 'state',
      required: true,
      type: 'integer'
    },

    toJSON: function () {
      var obj = this.toObject();

      delete obj.password;
      delete obj.socialProfiles;

      return obj;
    }
  },

  validationMessages: {
    role:{
      required: "roleId is required"
    }
  },

  beforeUpdate: function (values, next) {
    if (values.password) values.password = HashService.bcrypt.hashSync(values.password);
    next();
  },
  beforeValidate: function(values, next){
    if (!values.role){
      //if there is no role, then let throw required waterline error
      next();
    }else{
      var roleId = {id: values.role};
      Role.findOne(roleId)
      .then(function(role) {
        console.log(role.accessLevel);
        if(!role){
          sails.log.error(sails.config.errors.ROLE_NOT_FOUND);
          next(sails.config.errors.ROLE_NOT_FOUND);
        }else if(role.accessLevel == sails.config.generals.accessRoles.super){
          next(sails.config.errors.ROLE_NOT_MATCH);
        }else{
          next();
        }
      })
      .catch(function(err){
        next(err);
      });
    }
  },

  beforeCreate: function (values, next) {
    if (values.password) values.password = HashService.bcrypt.hashSync(values.password);
    next();
  }
};
