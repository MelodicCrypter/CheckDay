#!/usr/bin/env node

// Modules
const yargs = require('yargs');
const emoji = require('node-emoji');

// Local modules
const geocode = require('../lib/geocode');
const weather = require('../lib/weather');

// Yargs Settings
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

// Call geocode function, argv.a is the name of the location, eg: 'Africa', 'Norway', etc
geocode.geocodeAddress(argv.a, (errorMessage, geoResults) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        // Call weather function, lat (latitude) and lng (longitude) are required to get weather details
        weather.getWeather(geoResults.lat, geoResults.lng, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                const address = geoResults.address; // The returned location name
                const {timezone, icon, temperature} = weatherResults; // The weatherResults object
                // Convert time (milliseconds) to readable format
                const convertedTime = new Intl
                    .DateTimeFormat([], { timeZone: timezone, hour: 'numeric', minute: 'numeric', hour12: true })
                    .format(new Date());

                // Message border top
                console.log('\n\n============================================================================================\n');

                // The message
                if (icon === "rain") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':rain_cloud:')} rainy \nTemperature is ${temperature} \nCurrent time is ${convertedTime} \nTimezone is ${timezone}`);
                } else if (icon === "snow") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':snowflake:')} snowy \nTemperature is ${temperature} \nCurrent time is ${convertedTime} \nTimezone is ${timezone}`);
                } else if (icon === "sleet") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':snowman:')} sleety \nTemperature is ${temperature} \nCurrent time is ${convertedTime} \nTimezone is ${timezone}`);
                } else if (icon === "wind") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':wind_blowing_face:')} windy \nTemperature is ${temperature} \nCurrent time is ${convertedTime} \nTimezone is ${timezone}`);
                } else if (icon === "fog") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':fog:')} foggy \nTemperature is ${temperature} \nCurrent time is ${convertedTime} \nTimezone is ${timezone}`);
                } else if (icon === "cloudy") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':cloud:')} cloudy \nTemperature is ${temperature} \nCurrent time is ${convertedTime} \nTimezone is ${timezone}`);
                } else if (icon === "clear-day") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':sun_small_cloud:')} clear and sunny  \nTemperature is ${temperature} \nCurrent time is ${convertedTime} \nTimezone is ${timezone}`);
                } else if (icon === "clear-night") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':full_moon_with_face:')} clear and moony  \nTemperature is ${temperature} \nCurrent time is ${convertedTime} \nTimezone is ${timezone}`);
                } else if (icon === "partly-cloudy-day") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':sun_behind_cloud:')} partly cloudy \nTemperature is ${temperature} \nCurrent time is ${convertedTime} \nTimezone is ${timezone}`);
                } else if (icon === "partly-cloudy-night") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':cloud:')} partly cloudy  \nTemperature is ${temperature} \nCurrent time is ${convertedTime} \nTimezone is ${timezone}`);
                } else {
                    console.log('...');
                }

                // Message border bottom
                console.log('\n============================================================================================\n\n');
            }
        })
    }
});
