/* Environment config (.env) */
require('dotenv').config();

const restify = require('restify');
const server  = restify.createServer({
    name: 'nodebeats',
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(process.env.PORT, function () {
    console.log('%s listening at %s', server.name, server.url);
});