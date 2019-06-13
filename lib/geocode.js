// Modules
const request = require('request');

// GOOGLE API key
const apiKey = 'YOUR_GOOGLE_API_HERE';

// geocodeAddress
function geocodeAddress(address, callback) {
    // url encode the raw address
    const encodedAdd = encodeURIComponent(address);

    // request({options}, callback);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdd}&key=${apiKey}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers');
        } else if(body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address');
        } else if(body.status === 'INVALID_REQUEST') {
            callback('Unable to find that address');
        } else if(body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng,
            });
        }
    });
}

// Modules to be exported
module.exports = {
    geocodeAddress
};