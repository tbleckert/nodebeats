/* Environment config (.env) */
require('dotenv').config();

const restify = require('restify');
const config  = {
    name: 'nodebeats',
    version: '1.0.0'
};

if (process.env.SSL) {
    config.key = process.env.HTTPS_KEY;
    config.certificate = process.env.HTTPS_CERT;
}

const server  = restify.createServer(config);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(process.env.PORT, function () {
    console.log('%s listening at %s', server.name, server.url);
});