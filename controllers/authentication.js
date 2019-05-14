const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');
const config = require('config');
const moment = require('moment');
const saltRounds = 10;

function getExpiresIn(expires) {
    let exp = new Date(expires);
    let current = new Date();
    return Math.ceil((exp - current) / 1000);
}

module.exports.generateToken = function(username) {
    return new Promise((resolve, reject) => {
        const expires = moment().add(config.get('ACCESS_TOKEN_EXPIRY'), config.get('ACCESS_TOKEN_EXPIRY_UNIT')).valueOf();
        jwt.sign({
            iss: username,
            exp: expires
        }, config.get('JWT_TOKEN_SECRET'), {}, function (error, token) {
            let  tokenObj = {
                token: token,
                expires_in: getExpiresIn(expires)
            };
            return resolve(tokenObj);
        });
    })
}
