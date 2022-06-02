// Api Keys for Mapquest
var apiKey = "95hcXeOsnd4dIFUnbepjXbFxyLKnwAAA";

// Global variables
var cityLat;
var cityLong;

var searchesStored = []

var breweryAddressMatrix = [];
var breweryAddressLongMatrix = [];
var breweryAddressLatMatrix =[];


  
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

var breweryData = function(){
    fetch("https://api.openbrewerydb.org/breweries?by_dist=" + cityLong + "," + cityLat + "&per_page=5")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        for(var i=0; i < 5; i++){
            breweryAddressMatrix[i] = data[i].street;
            breweryAddressLongMatrix[i] = data[i].longitude; 
            breweryAddressLatMatrix[i] = data[i].latitude;
        }
        console.log(breweryAddressMatrix);
        console.log(breweryAddressLongMatrix);
        console.log(breweryAddressLatMatrix);
    })
}
        // street/address, (use openbreweryapi)

         // distance, (use mapquestapi based on openbrewery long/lat)
        //  websiteurl, (use openbreweryapi)
       

// Save user search history into local storage

// load user local storage under search input



userLocation();

// listen event for click of search button
$("#searchform").on("submit", function(){
    event.preventDefault();
    var cityName = $('#search-input').val();
       // ADD in all funcions that need to run
       userLocation();
       breweryData();  
   
})

// listen event for click of past search history 
$("#search-history-container").on("click", "p", function(){
    var historyCityName = $(this).text();
    userLocation(cityName);
    // Run Fetch commands
    breweryData(cityName);
    
})



