[![forthebadge](http://forthebadge.com/images/badges/gluten-free.svg)](http://forthebadge.com)

# Nodebeats
Simple Heartbeats server written in Node.js and uses websockets and mongodb to store the beats for historical use. With heartbeats you can let your services send heartbeats to let you know that they are alive. You can also use this to track how active a certain activity. Every beat is saved with a timestamp, this is useful because for example different cron jobs will send heartbeats at different intervals. With the timestamp you'll know how long it's been since the last heartbeat.

## Get started
1. `npm install`
2. `cp .env.example .env`
3. `npm start`. Optionally install `pm2` and use the ecosystem.json config.
4. Post heartbeats `curl -H "Content-Type: application/json" -X POST -d '{"foo": "bar"}' http://localhost:8080/service-1/beat`.

## UI

Check [this repo](https://github.com/tbleckert/nodebeats-ui) for an example of how to use the heartbeats to present a visual monitoring of your services.
