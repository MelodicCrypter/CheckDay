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

// Call
geocode.geocodeAddress(argv.a, (errorMessage, geoResults) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        weather.getWeather(geoResults.lat, geoResults.lng, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                const address = geoResults.address; // The location name
                const temperature = JSON.stringify(weatherResults.temperature); // The temperature in degrees celsius

                if (weatherResults.icon === "rain") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':rain_cloud:')}rainy => ${temperature}`);
                } else if (weatherResults.icon === "snow") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':snowflake:')}snowy => ${temperature}`);
                } else if (weatherResults.icon === "sleet") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':snowman:')}sleet => ${temperature}`);
                } else if (weatherResults.icon === "wind") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':rain_cloud:')}rainy => ${temperature}`);
                } else if (weatherResults.icon === "fog") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':rain_cloud:')}rainy => ${temperature}`);
                } else if (weatherResults.icon === "cloudy") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':rain_cloud:')}rainy => ${temperature}`);
                } else if (weatherResults.icon === "clear-day") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':rain_cloud:')}rainy => ${temperature}`);
                } else if (weatherResults.icon === "clear-night") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':rain_cloud:')}rainy => ${temperature}`);
                } else if (weatherResults.icon === "partly-cloudy-day") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':rain_cloud:')}rainy => ${temperature}`);
                } else if (weatherResults.icon === "partly-cloudy-night") {
                    console.log(`Weather in ${address} is ${emoji.emojify(':rain_cloud:')}rainy => ${temperature}`);
                } else {
                    console.log('...');
                }
            }
        })
    }
});
