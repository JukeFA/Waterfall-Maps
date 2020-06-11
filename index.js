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

// let bRating = []
// let pRating = []
// let hDiff = []
// let elevation = []
// let canopy = []

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

//TODO 2. Add sorting options for Hike Distance
window.onload=function(){
    function logSubmit(event) {
        let bR = document.getElementById("beautyRating_input").value
        let pR = document.getElementById("photoRating_input").value
        let hD = document.getElementById("hikeDifficulty_input").value
        let elv = document.getElementById("elevation_input").value
        let can = document.getElementById("canopy_input").value
        
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
            finalList = filteredList(json.waterfalls)
        } else {
            finalList = filteredListCan(json.waterfalls)
        }
        console.log(finalList)



        event.preventDefault()
        
        function reloadMap() {
            var mapProp = {
                center: new google.maps.LatLng(35.591040, -81.797546), // North Carolina
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        
            map = new google.maps.Map(document.getElementById("map"), mapProp);
        
              //  $.getJSON(json, function(json1) {
        
        
            $.each(filteredList(finalList), function(key, data) {
        
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
            })
        };

        reloadMap()
    }
    const form = document.getElementById('form')
    form.addEventListener('submit', logSubmit);
}

const hikeDistance = array => array.filter(location => location.hDistance >= 2 + 'Miles') //* Filter for Hike Distance

//TODO 4. Make the Waterfall Names Searchable 
