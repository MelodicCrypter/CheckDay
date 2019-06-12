// Modules
const yargs = require('yargs');
const emoji = require('node-emoji');

// Local modules
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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
                const temperature = JSON.stringify(weatherResults.temperature); // The returned location's temperature

                // Message border top
                console.log('\n\n========================================================================================\n');

                // The message
                if (weatherResults.icon === "rain") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':rain_cloud:')}rainy => Temperature: ${temperature}`);
                } else if (weatherResults.icon === "snow") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':snowflake:')}snowy => Temperature: ${temperature}`);
                } else if (weatherResults.icon === "sleet") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':snowman:')}sleety => Temperature: ${temperature}`);
                } else if (weatherResults.icon === "wind") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':wind_blowing_face:')}windy => Temperature: ${temperature}`);
                } else if (weatherResults.icon === "fog") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':fog:')}foggy => Temperature: ${temperature}`);
                } else if (weatherResults.icon === "cloudy") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':cloud:')}cloudy => Temperature: ${temperature}`);
                } else if (weatherResults.icon === "clear-day") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':sun_small_cloud:')}clear and sunny => Temperature: ${temperature}`);
                } else if (weatherResults.icon === "clear-night") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':full_moon_with_face:')} clear and moony => Temperature: ${temperature}`);
                } else if (weatherResults.icon === "partly-cloudy-day") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':sun_behind_cloud:')}partly cloudy => Temperature: ${temperature}`);
                } else if (weatherResults.icon === "partly-cloudy-night") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':cloud:')}partly cloudy => Temperature: ${temperature}`);
                } else {
                    console.log('...');
                }

                // Message border bottom
                console.log('\n========================================================================================\n\n');
            }
        })
    }
});
