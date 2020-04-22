// Key = AIzaSyDJsw56Pe-TX7YOw9l2XQlREtw6zKqeeA0

let map;
const infowindow = new google.maps.InfoWindow();

const json = (() => {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./Map-api/Waterfall.json", //Json file location
        'dataType': "json",
        'success': function(data) {
        json = data;
    }
    });
    return json;
})();

function initMap() {

    var mapProp = {
        center: new google.maps.LatLng(35.591040, -81.797546), // North Carolina
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapProp);

      //  $.getJSON(json, function(json1) {




    $.each(json.waterfalls, function(key, data) {

        var latLng = new google.maps.LatLng(data.lat, data.lng); // Combine lat and lng for use

        // Marker showing 
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
          // icon: icon,
            title: data.title
        });
        // When Marker clicked
        //TODO (later) Make pretty
        var details = `${data.title} <br> ${data.beauty} <br> ${data.photo}`

        bindInfoWindow(marker, map, infowindow, details);
    });
}

function bindInfoWindow(marker, map, infowindow, strDescription) {
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(strDescription);
        infowindow.open(map, marker);
    });
}

google.maps.event.addDomListener(window, 'load', initMap);

//TODO 2. Add sorting options for Photo Rating, Beauty Rating, Elevation, Canopy, Hike Difficulty, and Hike Distance


const beautyRating = array => array.filter(location => location.beauty >= 5) //* Filter for Beauty Rating

const photoRating = array => array.filter(location => location.photo >= 5) //* Filter for Photo Rating

const hikeDifficulty = array => array.filter(location => location.hDifficulty >= 5) //* Filter for Hike Difficulty

const hikeDistance = array => array.filter(location => location.hDistance >= '2 Miles') //* Filter for Hike Distance

const Canopy = array => array.filter(location => location.canopy = 'open') //* Filter for Canopy

const Elevation = array => array.filter(location => location.elevation = 200) //* Filter for Elevation



//TODO 3. Make them Independent and yet interconnected

//TODO 4. Make the Waterfall Names Searchable 
