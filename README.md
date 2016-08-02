[![forthebadge](http://forthebadge.com/images/badges/gluten-free.svg)](http://forthebadge.com)

# Nodebeats
Simple Heartbeats server written in Node.js and uses websockets and mongodb to store the beats for historical use.

## Get started
1. `npm install`
2. `cp .env.example .env`
3. `npm start`. Optionally install `pm2` and use the ecosystem.json config.

## UI

Check [this repo](https://github.com/tbleckert/nodebeats-ui) for an example of how to use the heartbeats to present a visual monitoring of your services.

## Testing
1. Install `mocha` globally `npm install mocha -g`
2. `npm test`

_No tests written yet_
