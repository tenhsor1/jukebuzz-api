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
        var songs = req.param('songs',[]);
        var songToSave = 0;
        for(var i in songs){
          var song = songs[i];
          var songId = song.id;
          Song.findOne({id: songId, adminId:values.adminId})
            .then(function(err, thisSong) {
              if(!err && thisSong){
                return thisSong.id;
              }else{
                song = songs[songToSave];
                if(song.title && song.artist && values.adminId){
                  return Song.findOne({
                                title: song.title
                                , artist:song.artist
                                , adminId:values.adminId
                              });
                }
                songToSave++;
                throw new Error("The're are missing params for the song");
              }
            })
            .then(function(songFound){
              if(!songFound){
                //if the song was not found, then try to create it
                song = songs[songToSave++];
                return Song.create({title:song.title
                          , artist:song.artist
                          , adminId:values.adminId
                          , genre: song.genre});
              }else if(songFound.id){
                //if found a song with the same title, artist and from the admin
                //add it to the list
                list.songs.add(songFound.id);
                songToSave++;
                return null;
              }else{
                //if the song was found by the id then add it to the list
                list.songs.add(songFound);
                songToSave++;
                return null;
              }
            })
            .then(function(newSong){
              if(newSong){
                list.songs.add(newSong.id);
                sails.log.info('song created correctly:');
                sails.log.info(newSong);
              }
              if (songToSave === songs.length)
                list.save();
            })
            .catch(function(error){
              console.log(error);
            });

        }
        res.created(list);
      })
      .catch(res.serverError);
  },
};