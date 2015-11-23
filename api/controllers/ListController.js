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
    delete values.songs;
    Model
      .create(values)
      .then(function(list){
        var songs = req.param('songs',[]);;
        for(var i in songs){
          var song = songs[i];
          var songId = song.id;
          if(songId){
            //if an id is passed as the song, then try to find it and add it to the list
            Song.findOne({id: songId, adminId:values.adminId})
            .then(function(err, thisSong) {
              if(!err && thisSong){
                list.songs.add(thisSong.id);
              }else{
                sails.log.error("The id: " + songId +
                                " doesn't exist for the admin: " + values.adminId);
              }
            });
          }else{
            //if no id passed, then try to get the title, artist and genre and create a new song
            var title = song.title;
            var artist = song.artist;
            var  genre = song.genre;

            if(title && artist && values.adminId){
              Song.findOne({title: title, artist:artist, adminId:values.adminId})
              .exec(function(err, thisSong){
                if(!err && thisSong){
                  list.songs.add(thisSong.id);
                }else{
                  Song.create({title:title
                          , artist:artist
                          , adminId:values.adminId
                          , genre: genre})
                  .exec(function createCB(err, thisSong){
                    if(!err){
                      list.songs.add(thisSong.id);
                    }else{
                      sails.log.error("Error saving a song: " + err);
                    }
                  });
                }
              });
            }else{
              //if there are not admin id or title or artist for the song
              sails.log.error("There are a missing parameter for a new song - artist:" +
                                artist + " title: " + title);
            }
          }
        }
        list.save();
        res.created(list);
      })
      .catch(res.serverError);
  },
};