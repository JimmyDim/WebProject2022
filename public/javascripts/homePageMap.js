mapboxgl.accessToken = 'pk.eyJ1IjoibWFpcnlzIiwiYSI6ImNsM3JyaXVvNDA4a3IzY3A2ZG54Z3JrejQifQ.JATyxVTD6yYWOUb3z4F5Yg';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [21.7259359, 38.2376827],
zoom: 10
});

console.log(pois);
console.log(pois.features[0].geometry.coordinates);
console.log(pois.features[0].geometry.coordinates[0]);

let len = pois.features.length;
console.log(len);

//change coordinates order: first lng second lat 
for (let i=0; i<len; i++) {
  let temp = pois.features[i].geometry.coordinates[0];
  pois.features[i].geometry.coordinates[0] = pois.features[i].geometry.coordinates[1];
  pois.features[i].geometry.coordinates[1] = temp;

  let marker = new mapboxgl.Marker()
  .setLngLat(pois.features[i].geometry.coordinates)
  .addTo(map); // add the marker to the map
  }


// const popup = new mapboxgl.Popup({ offset: 25 }).setText(
//     'Construction on the Washington Monument began in 1848.'
//     );
