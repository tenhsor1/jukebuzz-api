/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers
 */

module.exports.routes = {
  'GET /v1/countries': 'WorldController.findCountries',
  'GET /v1/countries/:country_id/states': 'WorldController.findStatesByCountry',
};
