/* Environment config (.env) */
require('dotenv').config();

const restify  = require('restify');
const socketio = require('socket.io');
const config   = require('./config');
const fs       = require('fs');

const restifyConfig = {
    name: 'nodebeats',
    version: '1.0.0'
};

if (config.ssl) {
    restifyConfig.key = fs.readFileSync(config.https_key);
    restifyConfig.certificate = fs.readFileSync(config.https_cert);
}

const server = restify.createServer(restifyConfig);
const io     = socketio.listen(server.server);

server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

require('./endpoints')(server, io);

server.listen(process.env.PORT, function () {
    console.log('%s listening at %s', server.name, server.url);
});
