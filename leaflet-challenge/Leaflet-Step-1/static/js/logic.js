function createMap(circleMarkers) 
{
  // Create the tile layer that will be the background of our map
  let streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  let darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
  let lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  let satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  let baseMaps = {
    "Streetmap": streetmap,
    "Light": lightmap,
    "Dark": darkmap,
    "Satellite": satellitemap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  let overlayMaps = {
    "Earthquakes": circleMarkers
  };

  // Create the map object with options
  let myMap = L.map("map-id", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, circleMarkers]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, 
  {
    collapsed: false
  }).addTo(myMap);

  let legend = L.control({position: 'bottomright'});

  legend.onAdd = function (myMap) {

      let div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 1, 2, 3, 4, 5],
          labels = [];

      div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>"

      // loop through our density intervals and generate a label with a colored square for each interval
      for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + Mags2(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };

  legend.addTo(myMap);


}

function createMarkers(response) 
{
  let locations = response.features;

  let circles = [];

  // Loop through the array
  for (let index = 0; index < locations.length; index++) 
  {
    let location = locations[index].geometry.coordinates;
    let mag = locations[index].properties.mag;
    let time = new Date(locations[index].properties.time);
    let place = locations[index].properties.place;

    let circle = L.circle([location[1], location[0]], 
    {
      color: 'black',
      weight: 1,
      fillColor: Mags(mag),
      fillOpacity: 0.9,
      radius: (mag * 15000)
    }).bindPopup("<h3>Location: " + place + "<h3>Magnitude: " + mag + "<h3>Date/Time: " + time.toString() + "<h3>");
    
    // Add the marker and circle to the array
    circles.push(circle);
  }

  // Create a layer group made from the markers array, pass it into the createMap function
  createMap(L.layerGroup(circles)); 
}

function Mags(mag)
{
  if (mag >= 0 && mag < 1)
  {
    return "green";
  }
  if (mag >= 1 && mag < 2)
  {
    return "yellowgreen";
  }
  if (mag >= 2 && mag < 3)
  {
    return "yellow";
  }
  if (mag >= 3 && mag < 4)
  {
    return "orange";
  }
  if (mag >= 4 && mag < 5)
  {
    return "orangered";
  }
  else
    return "red";
}

function Mags2(d) {
  return d > 5  ? 'red' :
         d > 4  ? 'orangered' :
         d > 3   ? 'orange' :
         d > 2   ? 'yellow' :
         d > 1   ? 'yellowgreen' :
                    'green';
}

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", createMarkers);