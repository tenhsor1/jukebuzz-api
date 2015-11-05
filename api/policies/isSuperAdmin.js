/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */

var passport = require('passport');

module.exports = function (req, res, next) {
  if(!req.user){
    return res.unauthorized(null, 403, "Unauthorized");
  }

  var user = req.user;
  var roleId = user.role;
  Role.findOne(roleId)
      .then(function(role) {
        console.log(sails.config.generals.accessRoles.super);
        if(role && role.accessLevel == sails.config.generals.accessRoles.super){
          next();
        }else{
          return res.unauthorized(null, 403, "Unauthorized");
        }
      })
      .catch(function(err){
        next(err);
      });
};
