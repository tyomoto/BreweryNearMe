// Api Keys for Mapquest
var apiKey = "95hcXeOsnd4dIFUnbepjXbFxyLKnwAAA";
var cityInput = 'Miami';

// Global variables
var cityLat = 0;
var cityLong = 0;

var breweryAddressMatrix = [];
var breweryAddressLongMatrix = [];
var breweryAddressLatMatrix =[];
 
// fetch function for city location based on search input
    // fetch lon/lat based on address using mapquest
var userLocation = function(cityName){
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${cityName}`)
    .then(function(response){
    return response.json();
    })
    .then(function(data){
        cityLat = data.results[0].locations[0].latLng.lat;
        cityLong = data.results[0].locations[0].latLng.lng;
        console.log(cityLat);
        console.log(cityLong);
        // console.log(data);
        breweryData();
    })
}

// fetch breweries by distance // GET https://api.openbrewerydb.org/breweries?by_dist=LON/LAT5&per_page=5
    //  brewery name, (use openbreweryapi)
    // street/address, (use openbreweryapi)
var breweryData = function(){
    fetch("https://api.openbrewerydb.org/breweries?by_dist=" + cityLat + "," + cityLong + "&per_page=5")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // console.log(data);
        for(var i=0; i < 5; i++){
            breweryAddressMatrix[i] = data[i].street;
            breweryAddressLongMatrix[i] = data[i].longitude; 
            breweryAddressLatMatrix[i] = data[i].latitude;
        }
        console.log(breweryAddressLatMatrix);
        console.log(breweryAddressLongMatrix);
        console.log(breweryAddressMatrix);
        getDistance();
        
    })
}

    // distance, (use mapquestapi based on openbrewery long/lat)
var getDistance = function(){
    console.log(breweryAddressLatMatrix);
    for(var i=0; i < 5; i++){
    fetch(`http://www.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${cityLat},${cityLong}&to=${breweryAddressLatMatrix[i]},${breweryAddressLongMatrix[i]}`)
    .then(function(response){
    return response.json();
    })
    .then(function(data){
        console.log(data);
    })
    }
}

    //  websiteurl, (use openbreweryapi)
       

// Save user search history into local storage


// load user local storage under search input


// listen event for click of search button

userLocation(cityInput);

// distance();
// listen event for click of past search history 
