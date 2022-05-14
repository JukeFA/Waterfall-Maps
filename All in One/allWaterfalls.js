let map;
const infowindow = new google.maps.InfoWindow();

const CTjson = (() => {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/Connecticut/Connecticut Waterfalls.json", //Json file location
        'dataType': "json",
        'success': function(data) {
        json = data;
    }
    });
    return json;
})();

const MAjson = (() => {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/Massachusetts/Massachusetts Waterfalls.json", //Json file location
        'dataType': "json",
        'success': function(data) {
        json = data;
    }
    });
    return json;
})();

const NCjson = (() => {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/North Carolina/North Carolina Waterfalls.json", //Json file location
        'dataType': "json",
        'success': function(data) {
        json = data;
    }
    });
    return json;
})();

const PAjson = (() => {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/Pennsylvania/Pennsylvania Waterfalls.json", //Json file location
        'dataType': "json",
        'success': function(data) {
        json = data;
    }
    });
    return json;
})();

const RIjson = (() => {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/Rhode Island/Rhode Island Waterfalls.json", //Json file location
        'dataType': "json",
        'success': function(data) {
        json = data;
    }
    });
    return json;
})();

const TNjson = (() => {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/Tennessee/Tennessee Waterfalls.json", //Json file location
        'dataType': "json",
        'success': function(data) {
        json = data;
    }
    });
    return json;
})();

const VTjson = (() => {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/Vermont/Vermont Waterfalls.json", //Json file location
        'dataType': "json",
        'success': function(data) {
        json = data;
    }
    });
    return json;
})();

const VAjson = (() => {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/Virginia/Virginia Waterfalls.json", //Json file location
        'dataType': "json",
        'success': function(data) {
        json = data;
    }
    });
    return json;
})();

const WVjson = (() => {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/West Virginia/Wesst Virginia Waterfalls.json", //Json file location
        'dataType': "json",
        'success': function(data) {
        json = data;
    }
    });
    return json;
})();

let dark =  [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
]

let light = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    }
]

let darkTest = window.matchMedia('(prefers-color-scheme: dark)').matches

var ctWaterfalls = CTjson.waterfalls;
var maWaterfalls = MAjson.waterfalls;
var ncWaterfalls = NCjson.waterfalls;
var paWaterfalls = PAjson.waterfalls;
var riWaterfalls = RIjson.waterfalls;
var tnWaterfalls = TNjson.waterfalls;
var vtWaterfalls = VTjson.waterfalls;
var vaWaterfalls = VAjson.waterfalls;
var wvWaterfalls = WVjson.waterfalls;

var waterfalls = [ ...ctWaterfalls, ...maWaterfalls, ...ncWaterfalls, ...paWaterfalls, ...riWaterfalls, ...tnWaterfalls, ...vtWaterfalls, ...vaWaterfalls, ...wvWaterfalls ];

console.log(waterfalls);

function initMap() {

    var mapProp = {
        center: new google.maps.LatLng(37.591040, -83.797546), // North Carolina
        zoom: 6,
        gestureHandling: 'greedy',
        styles: darkTest ? dark : light 
    };

    let infoWindow = new google.maps.InfoWindow();

    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //         position => {
    //             const pos = {
    //                 lat: position.coords.latitude,
    //                 lng: position.coords.longitude
    //             };
    //             console.log(pos)
    //             infoWindow.setPosition(pos);
    //             map.setCenter(pos);
    //             var marker = new google.maps.Marker({
    //                 position: pos,
    //                 map: map,
    //                 icon: './img/pngfuel.com.png',
    //                 title: "Current Location"
    //             });
    //         },
    //         () => {
    //         handleLocationError(true, infoWindow, map.getCenter());
    //         }
    //     );
    // } else {
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, infoWindow, map.getCenter());
    // }

    map = new google.maps.Map(document.getElementById("map"), mapProp);

      //  $.getJSON(json, function(json1) {


    $.each(waterfalls, function(key, data) {

        var latLng = new google.maps.LatLng(data.lat, data.lng); // Combine lat and lng for use

        // Marker showing 
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
          // icon: icon,
            title: data.title
        });
        // When Marker clicked
        //TODO (later) Make More pretty
        var details = `<div class="marker"><strong><h3>${data.title}</h3></strong> 
                        Beauty Rating: <span class="number">${data.beauty}</span> Photo Rating: <span class="number">${data.photo}</span>
                        <br> Hike Difficulty: <span class="number">${data.hDifficulty}</span> Hike Distance: <span class="number">${data.hDistance}</span>
                        <br> Compass Heading: <span class="number">${data.compass}</span> Elevation: <span class="number">${data.elevation}</span>
                        <br> Page Number: <span class="number">page ${data.pageNumber}</span> Canopy: <span class="number">${data.canopy}</span><div>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${data.lat},${data.lng}" target="_blank" class="button" style="margin-top:100px">Click Here For Directions</a>
                        `

        bindInfoWindow(marker, map, infowindow, details);
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

function bindInfoWindow(marker, map, infowindow, strDescription) {
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(strDescription);
        // infowindow.setMaxWidth(400);
        infowindow.open(map, marker);
    });
}

google.maps.event.addDomListener(window, 'load', initMap);

window.onload=function(){
    function logSubmit(event) {
        let bR = document.getElementById("beautyRating_input").value
        let pR = document.getElementById("photoRating_input").value
        let hD = document.getElementById("hikeDifficulty_input").value
        let elv = document.getElementById("elevation_input").value
        let can = document.getElementById("canopy_input").value
        let hDis = document.getElementById("hikeDistance_input").value
        let comp = document.getElementById("compass_input").value

        if (elv == 0) {
            elv = 10000
        }
        if (hD == 0) {
            hD = 10
        }

        console.log(bR, pR, hD, elv, can, hDis, comp)

        const filteredList = array => array
            .filter(location => location.beauty >= bR)
            .filter(location => location.photo >= pR)
            .filter(location => location.hDifficulty <= hD)
            .filter(location => location.elevation <= elv)
            // .filter(location => location.canopy = can)

        const filteredListCan = array => array
            .filter(location => location.beauty >= bR)
            .filter(location => location.photo >= pR)
            .filter(location => location.hDifficulty <= hD)
            .filter(location => location.elevation <= elv)
            .filter(location => location.canopy == can)

        let finalList = []

        if (can == 'all') {
            finalList = filteredList(waterfalls)
        } else {
            finalList = filteredListCan(waterfalls)
        }

        //Hike Distance
        switch (hDis) {
            case "1":
                finalList = lessThanTenth(finalList)
                break
            case "2":
                finalList = lessThanQuarter(finalList)
                break
            case "3":
                finalList = lessThanHalf(finalList)
                break
            case "4":
                finalList = lessThanThreeQuarter(finalList)
                break
            case "5":
                finalList = lessThanOne(finalList)
                break
            case "6":
                finalList = lessThanTwo(finalList)
                break
            case "10":
                finalList = moreThanTwo(finalList)
                break
            default:
                finalList = finalList
        };

        // Compass Heading 
        switch (comp) {
            case 'N':
                finalList = N(finalList)
                break
            case 'NE':
                finalList = NE(finalList)
                break
            case 'E':
                finalList = E(finalList)
                break
            case 'SE':
                finalList = SE(finalList)
                break
            case 'S':
                finalList = S(finalList)
                break
            case 'SW':
                finalList = SW(finalList)
                break
            case 'W':
                finalList = W(finalList)
                break
            case 'NW':
                finalList = NW(finalList)
                break
            default:
                finalList = finalList
        }

        event.preventDefault()

        waterfalls = finalList
        initMap()

    }
    const form = document.getElementById('form')
    form.addEventListener('submit', logSubmit);
}


//* For Compass Heading
const N = array => array.filter(location => location.compass >=338 || location.compass <=22)
const NE = array => array.filter(location => location.compass >=23 && location.compass <=67)
const E = array => array.filter(location => location.compass >=68 && location.compass <=112)
const SE = array => array.filter(location => location.compass >=113 && location.compass <=157)
const S = array => array.filter(location => location.compass >=158 && location.compass <=202)
const SW = array => array.filter(location => location.compass >=203 && location.compass <=247)
const W = array => array.filter(location => location.compass >=248 && location.compass <=292)
const NW = array => array.filter(location => location.compass >=293 && location.compass <=337)

//* For Hike Distance
const lessThanTenth = array => array.filter(location => location.hDistance.split(' ')[1] == "yards" || location.hDistance.split(' ')[1] == "feet" || location.hDistance.split(' ')[0] <= 0.1)
const lessThanQuarter = array => array.filter(location => location.hDistance.split(' ')[1] == "yards" || location.hDistance.split(' ')[1] == "feet" || location.hDistance.split(' ')[0] <= 0.25)
const lessThanHalf = array => array.filter(location => location.hDistance.split(' ')[1] == "yards" || location.hDistance.split(' ')[1] == "feet" || location.hDistance.split(' ')[0] <= 0.5)
const lessThanThreeQuarter = array => array.filter(location => location.hDistance.split(' ')[1] == "yards" || location.hDistance.split(' ')[1] == "feet" || location.hDistance.split(' ')[0] <= 0.75)
const lessThanOne = array => array.filter(location => location.hDistance.split(' ')[1] == "yards" || location.hDistance.split(' ')[1] == "feet" || location.hDistance.split(' ')[0] <= 1)
const lessThanTwo = array => array.filter(location => location.hDistance.split(' ')[1] == "yards" || location.hDistance.split(' ')[1] == "feet" || location.hDistance.split(' ')[0] <= 2)
const moreThanTwo = array => array.filter(location => location.hDistance.split(' ')[0] > 2.0 && location.hDistance.toLowerCase().split(' ')[1] != "yards" && location.hDistance.toLowerCase().split(' ')[1] != "feet")




//TODO 4. Make the Waterfall Names Searchable 