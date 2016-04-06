/* Environment config (.env) */
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

describe('MongoDB', function() {
    describe('connect', function () {
        it('error should return null', function () {
            MongoClient.connect(process.env.MONGO_URL, function(err, db) {
                assert.equal(null, err);
                db.close();
            });
        });
    });
});