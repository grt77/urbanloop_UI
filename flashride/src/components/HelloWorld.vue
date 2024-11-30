<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <v-row>
        <v-col
          cols="6"
        >
          <div class="d-flex justify-end">
            <v-btn
              variant="flat"
              size="x-large"
              rounded="lg"
              @click="driverViewRoute"
            >
              Driver View
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
              rounded="lg"
              @click="riderViewRoute"
            >
              Rider View
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function driverViewRoute() {
    router.push({ name: 'driver' });
}

function riderViewRoute() {
    router.push({ name: 'rider' });
}

</script>
