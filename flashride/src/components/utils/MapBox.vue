<template>
  <div id="map"></div>
  <!-- <div id="map" ref="mapContainer" class="map-container"></div> -->
</template>

<script>
const recaptchaScript = document.createElement("script");
recaptchaScript.setAttribute(
  "src",
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.js"
);
document.head.appendChild(recaptchaScript);
const recaptchaScript1 = document.createElement("script");
recaptchaScript1.setAttribute(
  "src",
  "https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.js"
);
document.head.appendChild(recaptchaScript1);
import mapboxgl from 'mapbox-gl';
	// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3Jhdml0ZTciLCJhIjoiY20zdHJ4eWZsMGFuYTJqc2NsOW9mcG10MiJ9.lovACSkEMNi5-oMBDYCzbQ';
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-79.4512, 43.6568],
        zoom: 13
    });

    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );

//   name: "Mapbox",
//   props: {
//     source: {
//       type: Array, // Example: [longitude, latitude]
//       required: true,
//     },
//     destination: {
//       type: Array, // Example: [longitude, latitude]
//       required: true,
//     },
//   },
//   data() {
//     return {
//       map: null,
//     };
//   },
//   mounted() {
//     this.initializeMap();
//   },
//   methods: {
//     initializeMap() {
//       mapboxgl.accessToken = "pk.eyJ1IjoiZ3Jhdml0ZTciLCJhIjoiY20zdHJ4eWZsMGFuYTJqc2NsOW9mcG10MiJ9.lovACSkEMNi5-oMBDYCzbQ";

//       // Initialize the map
//       this.map = new mapboxgl.Map({
//         container: this.$refs.mapContainer,
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: this.source,
//         zoom: 12,
//       });

//       // Add markers for source and destination
//       this.addMarker(this.source, "Source");
//       this.addMarker(this.destination, "Destination");

//       // Wait until the map has loaded to add the route
//       this.map.on("load", this.drawRoute);
//     },
//     addMarker(coordinates, label) {
//       new mapboxgl.Marker()
//         .setLngLat(coordinates)
//         .setPopup(new mapboxgl.Popup().setText(label))
//         .addTo(this.map);
//     },
//     async drawRoute() {
//       const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.source.join(
//         ","
//       )};${this.destination.join(
//         ","
//       )}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

//       try {
//         const response = await fetch(directionsUrl);
//         const data = await response.json();

//         if (data.routes && data.routes.length > 0) {
//           const route = data.routes[0].geometry;

//           // Add the route as a new source
//           this.map.addSource("route", {
//             type: "geojson",
//             data: {
//               type: "Feature",
//               properties: {},
//               geometry: route,
//             },
//           });

//           // Add the route layer
//           this.map.addLayer({
//             id: "route",
//             type: "line",
//             source: "route",
//             layout: {
//               "line-join": "round",
//               "line-cap": "round",
//             },
//             paint: {
//               "line-color": "#1DB954",
//               "line-width": 5,
//             },
//           });
//         } else {
//           console.error("No routes found");
//         }
//       } catch (error) {
//         console.error("Error fetching route data:", error);
//       }
//     },
//   },
// };



	// mapboxgl.accessToken = 'pk.eyJ1IjoiZ3Jhdml0ZTciLCJhIjoiY20zdHJ4eWZsMGFuYTJqc2NsOW9mcG10MiJ9.lovACSkEMNi5-oMBDYCzbQ';
  //   const map = new mapboxgl.Map({
  //       container: 'map',
  //       // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  //       style: 'mapbox://styles/mapbox/streets-v12',
  //       center: [-79.4512, 43.6568],
  //       zoom: 13
  //   });

  //   map.addControl(
  //       new MapboxDirections({
  //           accessToken: mapboxgl.accessToken
  //       }),
  //       'top-left'
  //   );

</script>

<style>
.map-container {
  width: 100%;
  height: 100vh;
}
</style>
