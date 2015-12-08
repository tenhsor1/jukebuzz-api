'use strict';
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = {
  create: function(req, res){
    var Model = actionUtil.parseModel(req);
    var values = actionUtil.parseValues(req);
    values.adminId = req.user.id;
    Model
      .create(values)
      .then(res.created)
      .catch(res.serverError);
  },
  adminFind: function(req, res){

    var admin = req.user;
    var adminId = req.param('adminId');
    if(admin.id == adminId){
      Song.find({adminId: adminId})
      .then(function(songs) {
        res.ok(songs);
      })
      .catch(function(err){
        res.serverError(err);
      });
    }else{
      res.unauthorized(null, 403, 'Unauthorized');
    }
  },
};