/**
 * CountryController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	_config: {
    actions: false,
    shortcuts: false,
    rest: false
  },
  findCountries: function(req, res){
    Country.find()
    .then(function(countries){
      res.ok(countries, 200);
    })
    .catch(function(err){
      res.serverError(err);
    });
  },
  findStatesByCountry: function(req, res){
    var countryId = req.param('country_id');

    State.find({countryId: countryId})
    .then(function(states) {
      console.log(states);
      res.ok(states, 200);
    })
    .catch(function(err){
      res.serverError(err);
    });

  }
};

