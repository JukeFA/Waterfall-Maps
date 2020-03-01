var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 35.492254, lng: -82.526401}, 
        zoom: 10
    })
    var script = map.data.loadGeoJson('map.json');
    document.getElementsByTagName('head')[0].appendChild(script)
}
var window = function (results) {
    for (var i = 0; i < results.features.length; i++) {
        const coords = results.features[i].geometry.coordinates;
        const latLng = new google.maps.LatLng(coords[1],coords[0]);
        const marker = new google.maps.Marker({
            position: latLng,
            map: map
        });

        var infowindow = new google.maps.InfoWindow({
            content: 'click me',
            position: latLng
        });

        infowindow.open(map)
        window.marker.addListener('click', function() {
            infowindow.setContent('Zoom: ');
        });
    }
}