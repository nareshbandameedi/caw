
const jsonpatch = require('fast-json-patch');
const config = require('config');
const Kraken = require("kraken");
const KRAKEN_API_KEY = config.get('KRAKEN_API_KEY');
const KRAKEN_API_SECRET = config.get('KRAKEN_API_SECRET');
const kraken = new Kraken({
    api_key: KRAKEN_API_KEY,
    api_secret: KRAKEN_API_SECRET
});

/*
summary: Image resize accoding to specified height and width based on image ascpect ratio
params: url: string, height: number, width: number, strategy: string
additional docs: kraken package is used to resize image. Please refer docs here https://kraken.io/docs/image-resizing
*/

const getImage = function(req, res, next) {
    var params = {
        url: req.body.url,
        wait: true,
        resize: {
            width: req.body.width,
            height: req.body.height,
            strategy: req.body.strategy
        }
    };
    return new Promise((resolve, reject) => {
        kraken.url(params, function(err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(data);
            }
        });
    })
    .then((image) => {
        return res.status(200).send({url: image.kraked_url});
    })
    .catch(err => {
        next(err);
    })
}

module.exports.getImage = getImage;

