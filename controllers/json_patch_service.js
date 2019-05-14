
const jsonpatch = require('fast-json-patch');

/*
summary: Update json object from the json patch
params: json_patch: object, json_obeject: object
*/
const getJson = function(req, res, next) {
    const jsonPatch = req.body.json_patch;
    const jsonObj = req.body.json_obeject;
    var errors = jsonpatch.validate(jsonPatch, jsonObj);
    if (errors) {
        next(errors);
    }
    const document = jsonpatch.applyPatch(jsonObj, jsonPatch).newDocument;
    return res.status(200).send(document);
}
module.exports.getJson = getJson;

