mapboxgl.accessToken = 'pk.eyJ1IjoibWFpcnlzIiwiYSI6ImNsM3JyaXVvNDA4a3IzY3A2ZG54Z3JrejQifQ.JATyxVTD6yYWOUb3z4F5Yg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [21.7259359, 38.2376827],
    zoom: 12
});

map.on('load', () => {
    // Add an image to use as a custom marker
    map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('custom-marker', image);
            // Add a GeoJSON source with 2 points
            map.addSource('points', {
                'type': 'geojson',
                'data': pois
            });

            // Add a symbol layer
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': 'custom-marker',
                    // get the title name from the source's "title" property
                    'text-field': ['get', 'title'],
                    'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                    ],
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top'
                }
            });
        }
    );
    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'points', async (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        console.log(coordinates);
        const description = e.features[0].properties.description;
        console.log(description);

        const name_of_poi = e.features[0].properties.name;
        console.log(name_of_poi)

        const visits = await fetch('http://localhost:3000/visitsEstimation/' + name_of_poi)
                       .then(response => response.json())

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }


        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(name_of_poi +"The visits Est : " + visits.average + "<form action='/visit/" + name_of_poi + "' method='post'> <a class='btn btn-primary' href='/homepage' role='button'>register visit</a></form>")
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'points', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'points', () => {
        map.getCanvas().style.cursor = '';
    });
});


