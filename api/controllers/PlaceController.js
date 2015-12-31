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

  stateFind: function(req, res){
    var stateId = parseInt(req.param('stateId'));
    Place.find({'stateId': stateId})
    .then(function(places){
      if(places){
        res.ok(places, 200);
      }else{
        sails.log.error('Error finding places from state: ' + stateId);
        res.notFound(null, 'E_NOT_FOUND', 'No se encontraron lugares');
      }
    })
    .catch(function(error){
      sails.log.error('Failed finding places: ' + error);
    });
  },

  activeJukeboxes: function(req, res){
    function pad_with_zeroes(number, length) {

        var my_string = '' + number;
        while (my_string.length < length) {
            my_string = '0' + my_string;
        }
        return my_string;
    }

    var placeId = req.param('placeId');
    var currentdate = new Date();
    var hour = pad_with_zeroes(currentdate.getHours(), 2) + ":" +
                pad_with_zeroes(currentdate.getMinutes(),2);
    var dateFormatted = currentdate.getFullYear() + '-' +
        (currentdate.getMonth()+1) + '-' +
        currentdate.getDate();

    var whereQuery = {
      'startTime': {
        '<=': hour
      },
      'endTime': {
        '>=': hour
      },
      'placeId': placeId,
      'expirationDate': {
        '>=': dateFormatted
      }
    };
    Jukebox.find(whereQuery)
    .then(function(jukeboxes){
      if(jukeboxes){
        res.ok(jukeboxes, 200);
      }else{
        sails.log.error('Error finding jukeboxes from place: ' + placeId);
        res.notFound(null, 'E_NOT_FOUND', 'No se encontraron rockolas de este lugar');
      }
    })
    .catch(function(error){
      sails.log.error('Failed finding jukeboxes: ' + error);
    });
  },

  votedSongs: function(req, res){
    function search(id, myArray){
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i].id === id) {
              return i;
          }
      }
      return -1;
    }

    var placeId = req.param('placeId');
    Vote.find({where: {'placeId': placeId, 'played': false},
              select: ['songId'],
              })
    .populate('songId')
    .then(function(votes){
      var songsUnrepeated = [];
      if(votes){
        for (var i = 0; i < votes.length; i++) {
          var vote = votes[i];
          var song = vote.songId;
          var pos = search(song.id, songsUnrepeated);
          if(pos >= 0){
            songsUnrepeated[pos].votes++;
          }else{
            song.votes = 1;
            songsUnrepeated.push(song);
          }
        }

        var keysSorted = songsUnrepeated
          .sort(function(a,b){return   b.votes - a.votes; });

        res.ok(songsUnrepeated, 200);
      }else{
        sails.log.error('Error finding votes from place: ' + placeId);
        res.notFound(null, 'E_NOT_FOUND', 'No se encontraron votos de este lugar');
      }
    })
    .catch(function(error){
      sails.log.error('Failed finding votes: ' + error);
    });

    /*
    .groupBy('songId')
    .sum('count')
    .sort({count: 'desc'})
    .exec(function (err, songs){
      sails.log.debug(err);
      sails.log.debug(songs);
      if(err){
        sails.log.error('Error finding votes from place: ' + placeId);
        res.notFound(null, 'E_NOT_FOUND', 'No se encontraron votos de este lugar');
      }else{
        if(songs){
          res.ok(songs, 200);
        }else{
          res.notFound(null, 'E_NOT_FOUND', 'No se encontraron votos de este lugar');
        }
      }
    });

    /*
    .populate('songId')
    .then(function(songs){
      if(songs){

        res.ok(songs, 200);
      }else{
        sails.log.error('Error finding votes from place: ' + placeId);
        res.notFound(null, 'E_NOT_FOUND', 'No se encontraron votos de este lugar');
      }
    })
    .catch(function(error){
      sails.log.error('Failed finding votes: ' + error);
    });*/
  }
};