const authentication = require('./authentication');

/*
summary: Login user
params: username: string, password: string
*/
const userLogin = function(req, res, next) {
    const username = req.body.username;
    return authentication.generateToken(username)
    .then((token) => {
        return res.status(200).send({
            user: username,
            token: token
        });
    })
    .catch(next);
};

module.exports.userLogin = userLogin;