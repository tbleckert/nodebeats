'use strict';

const config = {};

for (let key in process.env) {
    if (process.env.hasOwnProperty(key)) {
        let value = process.env[key];
        let lowerCaseValue = value.toLowerCase();

        if (lowerCaseValue === 'true' || lowerCaseValue === 'false') {
            value = value === 'true';
        } else if (!isNaN(value)) {
            value = Number(value);
        }

        config[key.toLowerCase()] = value;
    }
}

module.exports = config;