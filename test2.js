
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var map = L.map('map',{
    center: [-28, 24],
    zoom: 6,
    layers: osm
});

const campus = L.geoJSON(null, {
    style :{
        color : "#000000",
        weight : 0.5,
        fillColor : "#73756a",
        fillOpacity :0.65
    }
}).addTo(map);

fetch('campus.geojson')
.then(response => response.json())
.then(data => {
    campus.addData(data),
    map.FitBounds(campus.getBounds)
});

const buildings = L.geoJSON(null, {
    style :{
        color : "#000000",
        weight : 0.5,
        fillColor : "#969696",
        fillOpacity :1
    }
}).addTo(map);

fetch('footprints.geojson')
.then(response => response.json())
.then(data => {
    buildings.addData(data),
    map.FitBounds(buildings.getBounds)
});

const pathway = L.geoJSON(null, {
    style :{
        color : "#000000",
        weight : 0.5,
        fillColor : "#000000",
        fillOpacity :1
    }
}).addTo(map);

fetch('pathway.geojson')
.then(response => response.json())
.then(data => {
    pathway.addData(data),
    map.FitBounds(pathway.getBounds)
});

var geojsonMarkerOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

L.geoJSON(someGeojsonFeature, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);

fetch('traffic_am.geojson')
.then(response => response.json())
.then(data => {
    geojsonMarkerOptions.addData(data),
    map.FitBounds(geojsonMarkerOptions.getBounds())
});


L.control.layers({'Campus': campus},{'Buildings': buildings, 'Pathway': pathway}).addTo(map);
L.control.scale().addTo(map);









