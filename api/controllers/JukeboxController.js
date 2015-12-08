'use strict';
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = {
  create: function(req, res){
    var listInfo = req;
    //console.log(listInfo.options);
    //listInfo.options.values.blacklist = ['songs'];

    //console.log(listInfo);

    var Model = actionUtil.parseModel(listInfo);
    var values = actionUtil.parseValues(listInfo);
    values.adminId = req.user.id;
    delete values.lists;
    Model
      .create(values)
      .then(function(jukebox){
        var lists = req.param('lists',[]);
        for(var i in lists){
          var list = lists[i];
          jukebox.lists.add(list);
        }
        jukebox.save();
        res.created(jukebox);
      })
      .catch(res.serverError);
  },
};