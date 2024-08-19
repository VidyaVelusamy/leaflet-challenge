let myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 6,
});
function markerSize(magnitude) {
  return  magnitude * 4;
}


  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  var satellite = L.tileLayer('https://{s}.satellite.maps/api/v1/{z}/{x}/{y}.jpg', {
    maxZoom: 18,
    attribution: 'Satellite imagery &copy; <a href="https://www.example.com">Example</a>'
  });
  
  var grayscale = L.tileLayer('https://{s}.grayscale.maps/api/v1/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Grayscale map &copy; <a href="https://www.example.com">Example</a>'
  });
  
  var baseMaps = {
    "Satellite": satellite,
    "Grayscale": grayscale
  };
  var overlays ={};
  function techtonicplate(techtonicplate){
  overlays = {
    "Tectonic Plates": techtonicplate
  };
  
}
L.control.layers(baseMaps, overlays).addTo(myMap);
  // Add the layer control to the map


 // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.

 var legend = L.control({ position: 'bottomright' })


legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend')
  var grades = [0, 10, 30, 50, 70, 100];
  var labels = [];
  var lab_limits =['-10-10','10-30','30-50','50-70','70-90','90+']
 div.innerHTML +=
      '<div class="legend">'
 
    for (var i = 0; i < grades.length; i++) {

      div.innerHTML +=
     '<div class="legend-item"><div class="legend-color" style="background:' + getColor(grades[i] + 1) + '"></div>' +
      lab_limits[i] + '</div>';
}
div.innerHTML +='</div>  ' 
 
  return div
}
legend.addTo(myMap)

      // Function to determine the color based on depth.
      function getColor(depth) {
        if (depth> 100) return "#FF4500";
        else if (depth >70) return "#FFA500";
        else if (depth >50) return "#FFFF00";
        else if (depth >30) return "#ADFF2F";
        else if (depth >10) return "#7FFF00";
        else return "#39FF14";
      }
// Create the createMarkers function.
function createMarkers() {
  // Define the URL for the GeoJSON data.
  let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  // Fetch the GeoJSON data from the USGS website.
  d3.json(link).then(function (data) {
      console.log(data.features);
      



      // Function to determine the size based on magnitude.
      function getSize(magnitude) {
          return magnitude * 4; // Adjust the multiplier as needed for better visibility.
      }

      // Create a GeoJSON layer and add it to the map.
      let myLayer = L.geoJSON(data.features, {
          pointToLayer: function (feature, latlng) {
              // Create a circle marker with color and size based on earthquake properties.
              return L.circleMarker(latlng, {
                  radius: getSize(feature.properties.mag),
                  fillColor: getColor(feature.geometry.coordinates[2]),
                  color: '#000',
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.75
              }).bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
          }
      }).addTo(myMap)

      
  });
}
function createtechtonicplate() {
  // Define the URL for the GeoJSON data.
  let link = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

  // Fetch the GeoJSON data from the USGS website.
  d3.json(link).then(function (data) {
      console.log(data.features);
      
      // Function to determine the size based on magnitude.
      function getSize(magnitude) {
          return magnitude * 4; // Adjust the multiplier as needed for better visibility.
      }

      // Create a GeoJSON layer and add it to the map.
      let myLayer = L.geoJSON(data.features, {
          pointToLayer: function (feature, latlng) {
              // Create a circle marker with color and size based on earthquake properties.
              return L.circleMarker(latlng, {
                  radius: getSize(feature.properties.mag),
                  fillColor: getColor(feature.geometry.coordinates[2]),
                  color: '#000',
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.75
              }).bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
          }
      }).addTo(myMap)

      techtonicplate(myLayer)
  });
  

}

createMarkers()
createtechtonicplate()