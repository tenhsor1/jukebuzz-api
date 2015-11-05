var WLError = require('waterline/lib/waterline/error/WLError');

var roleNotFound = new WLError();
roleNotFound.status = 400;
roleNotFound.reason = 'Role doesn\'t exist';
roleNotFound.code = 'E_VALIDATION';

var roleNotMatch = new WLError();
roleNotMatch.status = 400;
roleNotMatch.reason = 'Role doesn\'t match to a existing one';
roleNotMatch.code = 'E_VALIDATION';

module.exports.errors = {
  ROLE_NOT_FOUND: roleNotFound,
  ROLE_NOT_MATCH: roleNotMatch
};