const userService = require('./user_service'); 
const jsonService = require('./json_patch_service');
const ImageService = require('./image');

const auth = require('./auth');

module.exports.getImage = function(req, res, next) {
    return auth(req, res, next)
    .then(() => {
        return ImageService.getImage(req, res, next);
    })
    .catch(err => {
        next(err);
    })
};

module.exports.getJson =  function(req, res, next) {
    return auth(req, res, next)
    .then(() => {
        return jsonService.getJson(req, res, next);
    })
    .catch(err => {
        next(err);
    });
};

module.exports.userLogin = function(req, res, next) {
    return userService.userLogin(req, res, next);
};