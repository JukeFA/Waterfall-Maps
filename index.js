// Key = AIzaSyDJsw56Pe-TX7YOw9l2XQlREtw6zKqeeA0

var map;
var icon = "http://path/to/icon.png";
var json = "http://path/to/universities.json";
var infowindow = new google.maps.InfoWindow();

function initMap() {

    var mapProp = {
        center: new google.maps.LatLng(52.4550, -3.3833), //LLANDRINDOD WELLS
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapProp);

      //  $.getJSON(json, function(json1) {
    var json1 = {
        "waterfalls": [{
            "title": "falls",
            "beauty": 5,
            "photo": 2,
            "hDistance": "2 miles",
            "hDifficulty": 2,
            "lat": 52.415524,
            "lng": -4.063066
        }
        ]
    };
    $.each(json1.waterfalls, function(key, data) {

        var latLng = new google.maps.LatLng(data.lat, data.lng);

        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
          // icon: icon,
            title: data.title
        });
        console.log()
        var details = `${data.title} <br> ${data.website} <br> ${data.phone}`

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