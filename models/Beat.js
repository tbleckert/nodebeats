const mongo      = require('mongodb').MongoClient;
const config     = require('../config');
const url        = config.mongo_url;
const collection = 'beats';

const Beat = {
    instance: null,
    collection: null,

    connect(callback) {
        if (this.instance) {
            return callback(null);
        }

        mongo.connect(url, (error, db) => {
            if (error) {
                return callback(error);
            }

            this.instance = db;
            this.collection = db.collection(collection);

            return callback();
        });
    },

    close() {
        this.instance.close();
        this.instance = null;
    },

    find(service, callback) {
        this.connect((error) => {
            if (error) {
                return callback(error, null);
            }

            this.collection.findOne({service: service}, function (error, document) {
                return callback(error, document);
            });
        });
    },

    store(service, data, callback) {
        this.connect((error) => {
            if (error) {
                return callback(error, null);
            }

            this.collection.insert({service: service, beats: [data]}, function (error) {
                return callback(error);
            });
        });
    },

    update(service, data, callback) {
        this.connect((error) => {
            if (error) {
                return callback(error, null);
            }

            this.collection.update({service: service}, {$push: {'beats': {$each: [data], $slice: -config.keep_rows}}}, function (error) {
                return callback(error);
            });
        });
    }
};

module.exports = Beat;
