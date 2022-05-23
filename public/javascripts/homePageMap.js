mapboxgl.accessToken = 'pk.eyJ1IjoibWFpcnlzIiwiYSI6ImNsMjR5OTQwazA0bTAzYmxoMTlzd210M3YifQ.yCuHMj88Bw6d0_3RYlprrg';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [12.550343, 55.665957],
zoom: 3
});

console.log(s);
console.log(poi);


// fetch('../public/starting_pois.json')
//   .then(response => response.json())
//   .then(data => {
//     const geojson = data})

// const data = fs.readFileSync('public/starting_pois.json');
// const geojson = JSON.parse(data);

// add markers to map
for (const feature of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';
  
    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
  }




// const popup = new mapboxgl.Popup({ offset: 25 }).setText(
//     'Construction on the Washington Monument began in 1848.'
//     );

// // Create a default Marker and add it to the map.
// const marker1 = new mapboxgl.Marker()
// .setLngLat([12.554729, 55.70651])
// .setPopup(popup) // sets a popup on this marker
// .addTo(map);
 
// // Create a default Marker, colored black, rotated 45 degrees.
// const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
// .setLngLat([12.65147, 55.608166])
// .addTo(map); 

