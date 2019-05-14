const errorMessage = require('./error_codes');
module.exports = function(err, req, res, next) {
    if (typeof(err) === 'object' && err.name === 'MongoError') {
        return res.status(400).send({ code: 400, error_code: 'DB_ERROR', error_message: err.errmsg});
    }
    if (typeof(err) === 'object' && err.isJoi === true && err.name === 'ValidationError') {
        return res.status(400).send({ code: 400, error_code: 'VALIDATION_ERROR', error_message: err.details })
    }
    if (typeof(err) === 'object') {
        return res.status(400).send({ code: 400, error_code: 'VALIDATION_ERROR', error_message: err.message })
    }
    if (typeof(err) === 'string') {
        return res.status(400).send({
            code: 400,
            error_code: err,
            error_message: errorMessage[err]
        });
    }
    res.status(400).send(err);
};