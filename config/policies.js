/**
 * Policy Mappings
 *
 * Policies are simple functions which run before your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 */

module.exports.policies = {
  '*': 'isAuthenticated',

  AuthController: {
    '*': true
  },

  WorldController: {
    '*': true
  },

  PingController: {
    '*': true
  },

  UserController: {
    'find': ['isAuthenticated', 'isSuperAdmin'],
    'findToken': ['isAuthenticated']
  },
  PlaceController: {
    'adminFind': ['isAuthenticated', 'isAdmin'],
    'create': ['isAuthenticated', 'isAdmin'],
    'destroy': ['isAuthenticated', 'isAdmin'],
    'update': ['isAuthenticated', 'isAdmin'],
  }
};
