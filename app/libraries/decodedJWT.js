
const jwt = require('jsonwebtoken');
module.exports = function (token) {
    const decodedToken = jwt.decode(token, {
            complete: true
    });

    if (!decodedToken) {
        throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, `provided token does not decode as JWT`);
    }

    return decodedToken;
}
