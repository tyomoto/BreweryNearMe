// Api Keys for Mapquest
var ApiKay = "95hcXeOsnd4dIFUnbepjXbFxyLKnwAAA";

// Global variables
var cityLat;
var cityLong;
// fetch function for city location based on search input

var userLocation = function(cityName){
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${cityName}`)
        .then(function(response){
        return response.json();
        console.log(response);
    })
    .then(function(data){
        cityLat = data.results[0].locations[0].latLng.lat;
        cityLong = data.results[0].locations[0].latLng.lng;
        
        console.log(cityLat);
        console.log(cityLong);
        console.log(data);
    })
}
    // fetch lon/lat based on address using mapquest
    // fetch breweries by distance // GET https://api.openbrewerydb.org/breweries?by_dist=LON/LAT5&per_page=5
        //  brewery name, (use openbreweryapi)
        // street/address, (use openbreweryapi)
         // distance, (use mapquestapi based on openbrewery long/lat)
        //  websiteurl, (use openbreweryapi)
       


// Save user search history into local storage

// load user local storage under search input

// listen event for click of search button

userLocation();
// listen event for click of past search history 


