<template>
  <v-container class="fill-height">
    <v-responsive max-width="450">
      <div>
        <v-row>
          <v-col cols="6">
            <v-img
              class="mb-4"
              height="150"
              src="@/assets/auto.jpg"
              contain
            />
          </v-col>
          <v-col cols="6">
            <v-img
              class="mb-4"
              height="150"
              src="@/assets/urbanloop_logo.png"
              contain
            />
          </v-col>
        </v-row>
      </div>

      <!-- The Map Container -->
      <div
        id="map"
        style="width: 100%; height: 400px;"
      />

      <!-- Input Fields -->
      <div>
        <v-sheet
          class="mx-auto"
          width="450"
        >
          <v-form>
            <v-combobox
              v-model="sourceLocation"
              :items="sourceSuggestions"
              label="Current Location (auto detect)"
              prepend-inner-icon="mdi-magnify"
              :append-inner-icon="`mdi-crosshairs-gps`"
              @click:append-inner="autoDetectLocation"
              @input="fetchSourceSuggestions"
            />
            <v-combobox
              v-model="destinationLocation"
              :items="destinationSuggestions"
              label="Destination"
              prepend-inner-icon="mdi-magnify"
              @update:modelValue="destinationLocation = $event"
            />
            <v-text-field
              v-model="mobileNumber"
              label="Mobile Number"
              prepend-inner-icon="mdi-phone"
            />
            <v-btn
              block
              variant="flat"
              size="x-large"
              rounded="lg"
              color="blue-lighten-2"
              @click="initiateRideBooking"
            >
              Confirm
            </v-btn>
          </v-form>
        </v-sheet>
      </div>

      <div class="py-4" />
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import axios from "axios";

export default defineComponent({
  name: "MapView",
  data() {
    return {
      sourceLocation: "",
      destinationLocation: "",
      mobileNumber: "",
      sourceSuggestions: [] as string[],
      destinationSuggestions: [] as string[],
      map: null as mapboxgl.Map | null,
      directions: null as MapboxDirections | null,
      latitude: null as number | null,
      longitude: null as number | null,
    };
  },
  watch: {
    destinationLocation(newValue: string) {
      console.log(newValue);
      this.fetchDestinationSuggestions(newValue);
    },
  },
  mounted() {
    // Initialize Mapbox
    mapboxgl.accessToken = "pk.eyJ1IjoiZ3Jhdml0ZTciLCJhIjoiY20zdHJ4eWZsMGFuYTJqc2NsOW9mcG10MiJ9.lovACSkEMNi5-oMBDYCzbQ";
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-79.4512, 43.6568], // Default center before geolocation
      zoom: 13,
    });

    // Add Directions Control
    this.directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      controls: { profileSwitcher: false, instructions: false, inputs: false   },
    });
    this.map.addControl(this.directions, "top-left");

    // Automatically detect the current location
    this.autoDetectLocation();
  },
  methods: {
    // Fetch current location using Geolocation API
    autoDetectLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.latitude = latitude;
            this.longitude = longitude;
            this.sourceLocation = `${latitude}, ${longitude}`;
            this.reverseGeocode(latitude, longitude);  // Optional: Reverse geocode to get address
            this.centerMapOnLocation(latitude, longitude);  // Center map on detected location
          },
          (error) => {
            console.error("Error detecting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    },

    // Reverse Geocode to get human-readable address
    async reverseGeocode(lat: number, lng: number) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`,
          {
            params: { access_token: mapboxgl.accessToken },
          }
        );
        if (response.data.features.length) {
          this.sourceLocation = response.data.features[0].place_name;
        }
      } catch (error) {
        console.error("Error reverse geocoding:", error);
      }
    },

    // Center the map on the user's current location
    centerMapOnLocation(lat: number, lng: number) {
      if (this.map) {
        this.map.setCenter([lng, lat]);
        this.map.setZoom(13);  // Optionally, adjust zoom level
      }
    },

    // Fetch autocomplete suggestions for source
    async fetchSourceSuggestions(query: string) {
      if (!query) return;
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
          {
            params: {
              access_token: mapboxgl.accessToken,
              autocomplete: true,
              limit: 20,
            },
          }
        );
        this.sourceSuggestions = response.data.features.map((feature: any) => feature.place_name);
      } catch (error) {
        console.error("Error fetching source suggestions:", error);
      }
    },

    // Fetch autocomplete suggestions for destination
    async fetchDestinationSuggestions(query: string) {
      if (!query) return;
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
          {
            params: {
              access_token: mapboxgl.accessToken,
              autocomplete: true,
              limit: 20,
            },
          }
        );
        this.destinationSuggestions = response.data.features.map((feature: any) => feature.place_name);
      } catch (error) {
        console.error("Error fetching destination suggestions:", error);
      }
    },

    // Trigger ride booking
    initiateRideBooking() {
      console.log("Ride booking initiated");
      this.directions?.setOrigin(this.sourceLocation);
      this.directions?.setDestination(this.destinationLocation);
    },
  },
});
</script>

<style>
#map {
  margin-top: 20px;
  border: 1px solid #ddd;
  height: 400px;
}
</style>
