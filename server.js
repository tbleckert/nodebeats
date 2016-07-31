/* Environment config (.env) */
require('dotenv').config();

const restify = require('restify');
const config  = require('./config');

const restifyConfig  = {
    name: 'nodebeats',
    version: '1.0.0'
};

if (config.ssl) {
    restifyConfig.key = process.env.HTTPS_KEY;
    restifyConfig.certificate = process.env.HTTPS_CERT;
}

const server = restify.createServer(restifyConfig);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

require('./endpoints')(server);

server.listen(process.env.PORT, function () {
    console.log('%s listening at %s', server.name, server.url);
});