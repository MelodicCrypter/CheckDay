// Modules
const request = require('request');

// API key
const apiKey = 'YOUR_DARKSKY_API_HERE';

// getWeather
function getWeather(lat, lng, callback) {
    request({
        url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`,
        json: true,
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers');
        } else if(response.statusCode === 400) {
            callback('Unable to find that address');
        } else if(response.statusCode === 200) {
            callback(undefined, {
                timezone: body.timezone,
                icon: body.currently.icon,
                temperature: body.currently.temperature,
            });
        }
    });
}

// modules to be exported
module.exports = {
    getWeather
};