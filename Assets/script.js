// Api Keys for Mapquest
var apiKey = "95hcXeOsnd4dIFUnbepjXbFxyLKnwAAA";

// Global variables
var cityLat;
var cityLong;

var searchesStored = [];

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
        breweryData(); 
    })
}
    // fetch lon/lat based on address using mapquest

    // fetch breweries by distance // GET https://api.openbrewerydb.org/breweries?by_dist=LON/LAT5&per_page=5
        //  brewery name, (use openbreweryapi)

var breweryData = function(){
    console.log(cityLong);
    console.log(cityLat);
    fetch("https://api.openbrewerydb.org/breweries?by_dist=" + cityLat + "," + cityLong + "&per_page=5")
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
var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
if (searchHistory === null) {
    searchHistory = []
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
function storeHistory (name) {
    searchHistory.push(name);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
// load user local storage under search input
function renderHisotry() {
    var historyArray = JSON.parse(localStorage.getItem("searchHistory"));
    $("#search-history-container").text("");
    for (var i=0; i < historyArray.length; i++) {
        var itemAdded = $('<button>');
        itemAdded.addClass("history-button");
        itemAdded.text(historyArray[i]);
        $("#search-history-container").append(itemAdded);
    }
}



// listen event for click of search button
$("#searchform").on("submit", function(event){
    event.preventDefault();
    var cityName = $('#search-field-input').val();
       // ADD in all funcions that need to run
       console.log(cityName);
       userLocation(cityName);
       storeHistory(cityName);
       renderHisotry(); 
   
})

// listen event for click of past search history 
$("#search-history-container").on("click", ".history-button", function(){
    var cityName = $(this).text();
    userLocation(cityName);
    // Run Fetch commands
    breweryData(cityName);
    
})



