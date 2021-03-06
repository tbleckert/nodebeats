'use strict';

const restify = require('restify');
const Beat    = require('../models/Beat');
const config  = require('../config');

function dbResponse(error, res) {
    if (error) {
        return next(new restify.errors.InternalServerError(error));
    }

    res.send({success: true});
}

module.exports = function (server, io) {

    server.get('/:service/lastBeat', function (req, res, next) {
        Beat.find(req.params.service, function (error, document) {
            if (error) {
                return next(new restify.errors.InternalServerError(error));
            }

            if (!document) {
                return next(new restify.errors.NotFoundError('The service is not alive, send a beat to it'));
            }

            return res.send(document.beats.pop());
        })
    });

    server.get('/:service/beats', function (req, res, next) {
        Beat.find(req.params.service, function (error, document) {
            if (error) {
                return next(new restify.errors.InternalServerError(error));
            }

            if (!document) {
                return next(new restify.errors.NotFoundError('The service is not alive, send a beat to it'));
            }

            return res.send(document.beats);
        });
    });

    server.post('/:service/beat', function (req, res, next) {
        let service = req.params.service;

        Beat.find(service, function (error, document) {
            if (error) {
                return next(new restify.errors.InternalServerError(error));
            }

            let lastBeat = (document && document.beats) ? document.beats.pop() : false;

            if (lastBeat) {
                lastBeat    = (new Date(lastBeat.date)).getTime();
                let currentTime = (new Date).getTime();

                if (currentTime - lastBeat < config.time_between_beats) {
                    return dbResponse(false, res);
                }
            }

            let data = req.body;

            if (!data) {
                data = {};
            }

            data.date = new Date;

            if (document) {
                Beat.update(service, data, function (error) {
                    return dbResponse(error, res);
                });
            } else {
                Beat.store(service, data, function (error) {
                    return dbResponse(error, res);
                });
            }

            // Emit the event
            io.emit('beat:' + service, data);
        });

        return next();
    });

};
