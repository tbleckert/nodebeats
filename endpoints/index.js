'use strict';

const restify = require('restify');
const Beat    = require('../models/Beat');

function dbResponse(error, res) {
    Beat.close();

    if (error) {
        return next(new restify.errors.InternalServerError(error));
    }

    res.send({success: true});
}

module.exports = function (server) {

    server.post('/:service/beat', function (req, res, next) {
        let service = req.params.service;
        let data    = req.body;

        data.date = new Date;

        Beat.find(service, function (error, document) {
            if (error) {
                Beat.close();

                return next(new restify.errors.InternalServerError(error));
            }

            if (document) {
                Beat.update(service, data, function (error) {
                    return dbResponse(error, res);
                });
            } else {
                Beat.store(service, data, function (error) {
                    return dbResponse(error, res);
                });
            }
        });

        return next();
    });

};