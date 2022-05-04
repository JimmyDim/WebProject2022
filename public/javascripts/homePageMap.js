mapboxgl.accessToken = 'pk.eyJ1IjoibWFpcnlzIiwiYSI6ImNsMjR5OTQwazA0bTAzYmxoMTlzd210M3YifQ.yCuHMj88Bw6d0_3RYlprrg';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [12.550343, 55.665957],
zoom: 8
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
.setLngLat([12.554729, 55.70651])
.addTo(map);
 
// Create a default Marker, colored black, rotated 45 degrees.
const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
.setLngLat([12.65147, 55.608166])
.addTo(map); 