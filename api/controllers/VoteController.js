'use strict';
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = {
  create: function(req, res){
    var Model = actionUtil.parseModel(req);
    var values = actionUtil.parseValues(req);
    values.userId = req.user.id;

    var songId = req.param('songId');
    var userId = req.user.id;
    var jukeboxId = req.param('jukeboxId');

    var currentdate = new Date();
    var dateMinusHour = new Date();
    dateMinusHour.setHours(currentdate.getHours() - 1);

    var dateFormatted = dateMinusHour.getFullYear() + '-' +
        (dateMinusHour.getMonth()+1) + '-' +
        dateMinusHour.getDate() + ' ' +
        dateMinusHour.getHours() + ':' + dateMinusHour.getMinutes();

    Vote.find({'songId': songId,
                'userId': userId,
                'jukeboxId': jukeboxId,
                'createdAt': {
                  '>=': dateFormatted
                }})
    .then(function(vote){
      if(vote.length > 0){
        sails.log.error('Error, the vote for this song already exist: ' + songId);
        res.badRequest(null, 'E_VOTE_EXIST', 'Ya votaste por ésta canción, espera una hora');
      }else{
        Model
        .create(values)
        .then(res.created)
        .catch(res.serverError);
      }
    })
    .catch(function(error){
      sails.log.error('Failed posting vote: ' + error);
    });
  },
  setPlayedVotes: function(req, res){
    var songId = req.param('songId');
    Vote.update({'songId':songId},{'played':true}).exec(function afterwards(err, updated){
      if (err) {
        sails.log.error('Error, Couldnt set the votes as played ' + songId);
        res.serverError(null, 'E_UNKNOWN', 'Algo inesperado ocurrio, vuelve a intentarlo mas tarde');
        return;
      }
      res.ok(updated, 200);
    });
  },
};