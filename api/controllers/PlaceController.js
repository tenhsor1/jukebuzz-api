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
    console.log('entra');

    var admin = req.user;
    var adminId = req.param('adminId');
    if(admin.id == adminId){
      Place.find('selector')
    }else{
      res.unauthorized(null, 403, 'Unauthorized');
    }
  },
};