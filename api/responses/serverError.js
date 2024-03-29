/**
 * 500 (Internal Server Error) Response
 *
 * A generic error message, given when no more specific message is suitable.
 * The general catch-all error when the server-side throws an exception.
 */

module.exports = function (data, code, message, root) {
  // TODO: make transform camelCase to snake_case
  var response = _.assign({
    code: code || 'E_INTERNAL_SERVER_ERROR',
    message: message || 'Something bad happened on the server',
    data: data || {}
  }, root);
  status = data.status || 500;
  this.res.status(status);
  this.res.jsonx(response);
};
