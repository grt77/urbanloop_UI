<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-center fill-height mx-auto"
      max-width="900"
    >
      <v-img
        class="mb-4"
        height="150"
        src="@/assets/auto.jpg"
        contain
      />

      <v-img
        class="mb-4"
        height="150"
        src="@/assets/flashride_logo.png"
        contain
      />
    
      <div class="text-center">
        <h2 class="text-h3 font-weight-bold">
          You have a new ride request
        </h2>
      </div>
    
      <div class="py-4" />
    
      <v-row>
        <v-col
          cols="6"
        >
          <div class="d-flex justify-end">
            <v-btn 
              variant="flat"
              size="x-large"
              color="success"
              rounded="lg"
              @click="acceptRide"
            >
              Accept
            </v-btn>
          </div>
        </v-col>

        <v-col
          cols="6"
        >
          <div class="d-flex justify-start">
            <v-btn 
              variant="flat"
              size="x-large"
              color="red"
              rounded="lg"
            >
              Reject
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-img
        class="mb-4"
        height="150"
        src="@/assets/urbanloop_logo.png"
        contain
      />
    </v-responsive>
  </v-container>
</template>
    
<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()

function acceptRide() {
    router.push({ name: 'active-ride' });
}

</script>
