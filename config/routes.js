/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers
 */

module.exports.routes = {
  'GET /v1/countries': 'WorldController.findCountries',
  'GET /v1/countries/:country_id/states': 'WorldController.findStatesByCountry',
  'POST /v1/places': 'PlaceController.create',
  'POST /v1/lists': {blueprint: 'ListController.create', criteria: { blacklist: ['access_token'] }},
  'POST /v1/jukeboxes': {blueprint: 'JukeboxController.create', criteria: { blacklist: ['access_token'] }},
  'GET /v1/user': 'UserController.findToken',
  'GET /v1/places/state/:stateId': 'PlaceController.stateFind',
  'GET /v1/places/:placeId/jukeboxes': 'PlaceController.activeJukeboxes',
  'GET /v1/places/:placeId/votes': 'PlaceController.votedSongs',
  'PUT /v1/votes/:songId': 'VoteController.setPlayedVotes',
};
