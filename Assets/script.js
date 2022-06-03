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
var distanceMatrix =[];
 
// fetch function for city location based on search input
    // fetch lon/lat based on address using mapquest
var userLocation = function(cityName){
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${cityName}`)
    .then(function(response){
    return response.json();
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
        console.log(data);
        for(var i=0; i < data.length; i++){
            breweryNameMatrix[i] = data[i].name;
            breweryAddressMatrix[i] = data[i].street;
            breweryWebsiteMatrix[i] = data[i].website_url;
            breweryAddressLongMatrix[i] = data[i].longitude; 
            breweryAddressLatMatrix[i] = data[i].latitude;
            
            var breweryName = $("#brewery-name-" + [i+1]);
            breweryName.text("Brewery Name: " + breweryNameMatrix[i]);

            var breweryAddress = $("#brewery-address-" + [i+1]);
            breweryAddress.text("Brewery Address: " + breweryAddressMatrix[i])

            var websiteURL = $("#brewery-websiteurl-" + [i+1]);
            websiteURL.text(breweryWebsiteMatrix[i])
            websiteURL.attr("href", breweryWebsiteMatrix[i]);

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

    fetch(`https://www.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${cityLat},${cityLong}&to=${breweryAddressLatMatrix[0]},${breweryAddressLongMatrix[0]}`)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
            console.log(data);
            distanceMatrix[0] = data.route.distance;
            var breweryDistance = $("#brewery-distance-" + [1]);
            breweryDistance.text("Brewery Distance: " + distanceMatrix[0] + " Miles");
        })

    fetch(`https://www.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${cityLat},${cityLong}&to=${breweryAddressLatMatrix[1]},${breweryAddressLongMatrix[1]}`)
        .then(function(response){
        return response.json();
        })
        .then(function(data){
            console.log(data);
            distanceMatrix[1] = data.route.distance;
            var breweryDistance = $("#brewery-distance-" + [2]);
            breweryDistance.text("Brewery Distance: " + distanceMatrix[1] + " Miles");
        })

    fetch(`https://www.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${cityLat},${cityLong}&to=${breweryAddressLatMatrix[2]},${breweryAddressLongMatrix[2]}`)
    .then(function(response){
    return response.json();
    })
    .then(function(data){
        console.log(data);
        distanceMatrix[2] = data.route.distance;
        var breweryDistance = $("#brewery-distance-" + [3]);
        breweryDistance.text("Brewery Distance: " + distanceMatrix[2] + " Miles");
    })

    fetch(`https://www.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${cityLat},${cityLong}&to=${breweryAddressLatMatrix[3]},${breweryAddressLongMatrix[3]}`)
    .then(function(response){
    return response.json();
    })
    .then(function(data){
        console.log(data);
        distanceMatrix[3] = data.route.distance;
        var breweryDistance = $("#brewery-distance-" + [4]);
        breweryDistance.text("Brewery Distance: " + distanceMatrix[3]+ " Miles");
    })

    fetch(`https://www.mapquestapi.com/directions/v2/route?key=${apiKey}&from=${cityLat},${cityLong}&to=${breweryAddressLatMatrix[4]},${breweryAddressLongMatrix[4]}`)
    .then(function(response){
    return response.json();
    })
    .then(function(data){
        console.log(data);
        distanceMatrix[4] = data.route.distance;
        var breweryDistance = $("#brewery-distance-" + [5]);
        breweryDistance.text("Brewery Distance: " + distanceMatrix[4]+ " Miles");
        console.log(distanceMatrix);
    })

    
    
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

}


// load user local storage under search input
function renderHistory() {
    var historyArray = JSON.parse(localStorage.getItem("searchHistory"));
    $("#search-history-container").text("");
    for (var i=0; i < historyArray.length; i++) {
        var itemAdded = $('<button>');
        itemAdded.addClass("history-button");
        itemAdded.text(historyArray[i]);
        $("#search-history-container").append(itemAdded);
    }
}

renderHistory();



// listen event for click of search button
$("#searchform").on("submit", function(event){
    event.preventDefault();
    var cityName = $('#search-field-input').val();
       // ADD in all funcions that need to run
       console.log(cityName);
       userLocation(cityName);
       storeHistory(cityName);
       renderHistory();
       $("#search-field-input").val("");

   
})



// listen event for click of past search history 
$("#search-history-container").on("click", ".history-button", function(){
    var cityName = $(this).text();
    userLocation(cityName);
    // Run Fetch commands
    // breweryData(cityName);
    
})

// Listen event to clear search history
$("#clearBtn").on("click", function(event) {
    event.preventDefault();
    $("#search-history-container").text("");
    searchHistory = [];
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
})


