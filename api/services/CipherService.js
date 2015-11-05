var ciphers = require('sails-service-cipher');

module.exports = {
  jwt: ciphers('jwt', {secretKey: "9c822578c1936f9c77d1d10e0441aea63d996fe64235900dfff17adb4e988bd3"})
};
