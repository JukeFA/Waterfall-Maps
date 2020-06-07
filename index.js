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

let waterfall = json.waterfalls
let bRating = []
let pRating = []
let hDiff = []
// let bRating = []

function initMap() {

    var mapProp = {
        center: new google.maps.LatLng(35.591040, -81.797546), // North Carolina
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapProp);

      //  $.getJSON(json, function(json1) {


    $.each(waterfall, function(key, data) {

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
window.onload=function(){
    function logSubmit(event) {
        const waterfall = []
        let bR = document.getElementById("beautyRating_input").value
        let pR = document.getElementById("photoRating_input").value
        let hD = document.getElementById("hikeDifficulty_input").value

        const beautyRating = array => array.filter(location => location.beauty >= bR)
        bRating = beautyRating(json.waterfalls)
        console.log(bRating)

        const photoRating = array => array.filter(location => location.photo >= pR)
        pRating = photoRating(json.waterfalls)
        console.log(pRating)

        const hikeDifficulty = array => array.filter(location => location.hDifficulty >= hD)
        hDiff = hikeDifficulty(json.waterfalls)
        console.log(hDiff)

        for (var i = 0; i < bRating.length; i++) {
            for (var j = 0; j < pRating.length; j++) {
                for (var n = 0; n < hDiff.length; ++n){
                    if (bRating[i] == pRating[j] && bRating[i] == hDiff[n]) {
                        waterfall.push(bRating[i])
                    }
                }
            }
        }
        
        console.log(waterfall)
        event.preventDefault()
        
        function reloadMap() {
            var mapProp = {
                center: new google.maps.LatLng(35.591040, -81.797546), // North Carolina
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        
            map = new google.maps.Map(document.getElementById("map"), mapProp);
        
              //  $.getJSON(json, function(json1) {
        
        
            $.each(waterfall, function(key, data) {
        
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
    form.addEventListener('submit', logSubmit, initMap);

    console.log(waterfall)
}



// const beautyRating = array => array.filter(location => location.beauty >= 5) //* Filter for Beauty Rating

// const photoRating = array => array.filter(location => location.photo >= pR) //* Filter for Photo Rating

// const hikeDifficulty = array => array.filter(location => location.hDifficulty >= 5) //* Filter for Hike Difficulty

// const hikeDistance = array => array.filter(location => location.hDistance >= '2 Miles') //* Filter for Hike Distance

// const Canopy = array => array.filter(location => location.canopy = 'open') //* Filter for Canopy

// const Elevation = array => array.filter(location => location.elevation = 200) //* Filter for Elevation


//TODO 3. Make them Independent and yet interconnected

//TODO 4. Make the Waterfall Names Searchable 
