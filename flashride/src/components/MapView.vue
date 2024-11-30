<template>
  <v-container class="fill-height">
    <v-responsive

      max-width="900"
    >
      <div class="d-flex justify-start">
        <v-img
          class="mb-4"
          height="100"
          src="@/assets/urbanloop_logo.png"
        />
      </div>
      <v-img
        class="mb-4"
        height="150"
        src="@/assets/flashride_logo.png"
      />
      <v-img
        class="mb-4"
        height="600"
        src="@/assets/ride_map.png"
      />

      <slide-unlock
        ref="vueslideunlock"
        :circle="true"
        :width="100"
        :height="60"
        text="slide to End Ride"
        success-text="Ride has been completed"
        name="slideunlock"
        @completed="complete()"
      />

      <!-- <div class="text-center">
        <h1 class="text-h2 font-weight-bold">
          Vuetify
        </h1>
      </div> -->

      <div class="py-4" />
    </v-responsive>
  </v-container>
</template>

  <script setup lang="ts">
  import SlideUnlock from "@j2only/slide-unlock"
  </script>

  <style module>
    .slideunlock {
        --su-color-progress-complete-bg: #f44336;
    }
  </style>
