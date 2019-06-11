// The weather app in a single file with the use of promises

// Modules
const yargs = require('yargs');
const axios = require('axios');

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

// APIs
const apiGoogleKey = ' AIzaSyAxQYc5TXOvvXAEIdWAo5dBPO_xpdqC-xQ ';
const apiForecastKey = 'a1149f59a8f006bb7f82294e3fcb2a9d';
//
const encodedAdd = encodeURIComponent(argv.a);
// the Map API url
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdd}&key=${apiGoogleKey}`;

// Process
axios.get(geocodeURL)
    .then((response) => {
        if(response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address');
        }

        // setting for the weather forecast
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        const weatherURL = `https://api.darksky.net/forecast/${apiForecastKey}/${lat},${lng}`;

        // log the address to set as a header
        console.log(response.data.results[0].formatted_address);

        // return a new Promise by using the axios library
        return axios.get(weatherURL);
    })
    .then((response) => {
        const temperature = response.data.currently.temperature;
        const apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`Temperature is: ${temperature} but it feels like: ${apparentTemperature}`);
    })
    .catch((e) => {
        if(e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers');
        } else {
            console.log(e.message);
        }
    });
