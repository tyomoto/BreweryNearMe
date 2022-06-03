// Api Keys for Mapquest
var apiKey = "95hcXeOsnd4dIFUnbepjXbFxyLKnwAAA";


// Global variables



var cityLat;
var cityLong;

var searchesStored = [];

var breweryNameMatrix = [];
var breweryAddressMatrix = [];
var breweryAddressLongMatrix = [];
var breweryAddressLatMatrix =[];
var breweryWebsiteMatrix =[];
 
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

        console.log(data);
        breweryData(); 

    })
}

// fetch breweries by distance // GET https://api.openbrewerydb.org/breweries?by_dist=LON/LAT5&per_page=5
    //  brewery name, (use openbreweryapi)
    // street/address, (use openbreweryapi)
var breweryData = function(){

    // console.log(cityLong);
    // console.log(cityLat);

    fetch("https://api.openbrewerydb.org/breweries?by_dist=" + cityLat + "," + cityLong + "&per_page=5")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // console.log(data);
        for(var i=0; i < data.length; i++){
            breweryNameMatrix[i] = data[i].name;
            breweryAddressMatrix[i] = data[i].street;
            breweryWebsiteMatrix[i] = data[i].website_url;
            breweryAddressLongMatrix[i] = data[i].longitude; 
            breweryAddressLatMatrix[i] = data[i].latitude;
            
            var breweryName = $("#brewery-name-" + [i+1]);
            console.log(breweryName);
            breweryName.text("Brewery Name: " + breweryNameMatrix[i]);

            var breweryAddress = $("#brewery-address-" + [i+1]);
            breweryAddress.text("Brewery Address: " + breweryAddressMatrix[i])
        }
        console.log(data);
        console.log(breweryWebsiteMatrix);
        // console.log(breweryAddressLatMatrix);
        // console.log(breweryAddressLongMatrix);
        // console.log(breweryAddressMatrix);
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

var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
if (searchHistory == null) {
    searchHistory = [];
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}
function storeHistory (name) {
    if (name == "") {
        return;
    }
    for (var i = 0; i < searchHistory.length; i++) {
        if (name === searchHistory[i]) {
            return;
        }
    }
    searchHistory.push(name);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));




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

renderHisotry();



// listen event for click of search button
$("#searchform").on("submit", function(event){
    event.preventDefault();
    var cityName = $('#search-field-input').val();
       // ADD in all funcions that need to run
       console.log(cityName);
       userLocation(cityName);
       storeHistory(cityName);
       renderHisotry();
       $("#search-field-input").val("");

   
})



// listen event for click of past search history 
$("#search-history-container").on("click", ".history-button", function(){
    var cityName = $(this).text();
    userLocation(cityName);
    // Run Fetch commands
    breweryData(cityName);
    
})




