// const greenpois = [];
// const orangepois = [];
// const redpois = [];
// const filterInput = document.getElementById('filter-input');

mapboxgl.accessToken = 'pk.eyJ1IjoibWFpcnlzIiwiYSI6ImNsM3JyaXVvNDA4a3IzY3A2ZG54Z3JrejQifQ.JATyxVTD6yYWOUb3z4F5Yg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [21.7259359, 38.2376827],
    zoom: 14
});

const marker = new mapboxgl.Marker({
    color: "#3FB1CE",
    scale: 1
}).setLngLat([21.7259359, 38.2376827])
    .addTo(map);

    map.on('load', () => {
        // Add an image to use as a custom marker
        map.loadImage(
            'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
            (error, image) => {
                if (error) throw error;
                map.addImage('custom-marker', image);
                map.addSource('points', {
                    'type': 'geojson',
                    'data': pois
                });
    
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
    
            const name_of_poi = encodeURIComponent(e.features[0].properties.name);
            console.log(name_of_poi)
    
            const Decoded_name = e.features[0].properties.name;
    
            console.log(e);
    
            const visits = await fetch('http://localhost:3000/visitsEstimation/' + name_of_poi)
                .then(response => response.json())
    
            lat = coordinates[1];
            lng = coordinates[0];
    
            const distance = await fetch('http://localhost:3000/distance/' + lat + '/' + lng)
                .then(response => response.json())
    
            console.log("Distance is: " + distance.distance__result);
    
            if (distance.distance__result <= 20) {
    
                var visit_button = `<form action='/visit/${name_of_poi}' method='post'> <label for='crowd_est'>Crowd Est:</label>  <input type='text' id='crowd_est' name='crowd_est'><br> <br><button class='btn btn-primary' href='/homepage' role='button'>register visit</button></form>`
            }
            else visit_button = '';
    
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
    
            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML("<h5><strong>" + Decoded_name + "</strong></h5> <br> <b>Visits Est : <b>" + visits.average + visit_button)
                .addTo(map);
        });
    
        function forwardGeocoder(query) {
            const matchingFeatures = [];
            for (const poi of pois.features) {
                if (
                    poi.properties.types
                        .includes(query.toLowerCase())
                ) {
                    // Add a pin emoji as a prefix for custom
                    poi['place_name'] = `📌 ${poi.properties.name}`;
                    poi['center'] = poi.geometry.coordinates;
                    matchingFeatures.push(poi);
                }
            }
            return matchingFeatures;
        }
       
    
        // Add the control to the map.
        const geocoder = map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                localGeocoderOnly: true,
                localGeocoder: forwardGeocoder,
                zoom: 14,
                placeholder: 'Enter Point Of Interest',
                mapboxgl: mapboxgl
            })
        );
    
    
        map.addControl(new mapboxgl.NavigationControl());
    
        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'points', () => {
            map.getCanvas().style.cursor = 'pointer';
        });
    
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'points', () => {
            map.getCanvas().style.cursor = '';
        });
    });

// map.on('load', async () => {

//     map.addSource('points', {
//         'type': 'geojson',
//         'data': pois
//     });

    // for (const poi of pois.features) {

    //     const name_of_poi = encodeURIComponent(poi.properties.name);
    //     const icon = await fetch('http://localhost:3000/visitrate/' + name_of_poi)
    //         .then(response => response.json())
    //     const colour = icon.icon_colour;
    //     if (colour == 'green') {
    //         greenpois.push(poi);
    //     }
    //     else if (colour == 'orange') {
    //         orangepois.push(poi);
    //     }
    //     else if (colour == 'red') {
    //         redpois.push(poi);
    //     }

    //     const layerID = `poi-${colour}`;
    // }
    // const images = [{ url: 'http://localhost:3000/icons/mapbox-marker-icon-20px-green.png', id: 'green' }, { url: 'http://localhost:3000/icons/mapbox-marker-icon-20px-orange.png', id: 'orange' }, { url: 'http://localhost:3000/icons/mapbox-marker-icon-20px-red.png', id: 'red' }]
    // Promise.all(
    //     images.map(img => new Promise((resolve, reject) => {
    //         map.loadImage(img.url, function (error, res) {
    //             if (error) throw error;
    //             map.addImage(img.id, res)
    //             map.addSource('points', {
    //                 'type': 'geojson',
    //                 'data': pois
    //             });
    //             resolve();
    //         });
    //     }))
    // ).then(function () {
    //     for (const poi of pois.features) {
    //         if (!map.getLayer(layerID)) {
    //             map.addLayer({
    //                 'id': layerID,
    //                 'type': 'symbol',
    //                 'source': 'points',
    //                 'layout': {
    //                     'icon-image': colour,
    //                     'text-field': ['get', 'title'],
    //                     'text-font': [
    //                         'Open Sans Semibold',
    //                         'Arial Unicode MS Bold'
    //                     ],
    //                     'text-offset': [0, 1.25],
    //                     'text-anchor': 'top'
    //                 }

    //             })
    //         }
    //     }
    // })


// https://docs.mapbox.com/mapbox-gl-js/example/filter-markers-by-input/  Similar example for filter
    //     // Add a layer for this symbol type if it hasn't been added already.
    //     if (!map.getLayer(layerID)) {
    //         map.addLayer({
    //             'id': layerID,
    //             'type': 'symbol',
    //             'source': 'points',
    //             'layout': {
    //                 // These icons are a part of the Mapbox Light style.
    //                 // To view all images available in a Mapbox style, open
    //                 // the style in Mapbox Studio and click the "Images" tab.
    //                 // To add a new image to the style at runtime see
    //                 // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
    //                 'icon-image': symbol,
    //                 'icon-allow-overlap': true,
    //                 'text-field': symbol,
    //                 'text-font': [
    //                     'Open Sans Bold',
    //                     'Arial Unicode MS Bold'
    //                 ],
    //                 'text-size': 11,
    //                 'text-transform': 'uppercase',
    //                 'text-letter-spacing': 0.05,
    //                 'text-offset': [0, 1.5]
    //             },
    //             'paint': {
    //                 'text-color': '#202',
    //                 'text-halo-color': '#fff',
    //                 'text-halo-width': 2
    //             }
    //         });

    //         greenpois.push(layerID);
    //     }
    // }


