'use strict';
/**
 * UserController
 * @description :: Server-side logic for manage users
 */

module.exports = {
  findToken: function(req, res){
    res.ok(req.user, 200, "User found");
  }
};
