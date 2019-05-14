
'use strict';
const config = require('config');
const jwt = require('jsonwebtoken');

/*Verify Token */
const verifyToken = (token) => {
    const secret = config.get('JWT_TOKEN_SECRET');
    const options = { algorithms: [config.get('jwtAlgorithm')] };
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, options, (err, decoded) => {
            if (err) {
                return reject('TOKEN_FORMAT');
            }
            if (!decoded) {
                return reject('TOKEN_NOT_VALID');
            }
            if (decoded.exp <= Date.now()) {
                return reject('TOKEN_EXPIRED');
            }
            return resolve(decoded);
        });
    });
};

/* summary: validates request with an authentication */
module.exports = function (req, res, next) {
    const token = req.headers['x-token'];
    if (!token) {
        return next('AUTH_TOKEN_REQUIRED');
    }
    return verifyToken(token)
    .then((decoded) => {
            req.user = decoded;    
            return true;
    });
};
