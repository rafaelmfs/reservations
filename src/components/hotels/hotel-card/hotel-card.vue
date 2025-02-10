<script setup lang="ts">
import { computed } from 'vue'
import type { Hotel } from 'src/storage/hotels/Hotels'

import HotelCardDetails from './hotel-card-details.vue'
import HotelCarousel from '../hotel-carousel.vue'
import HotelCardValues from './hotel-card-values.vue'
import { useDrawerHotelStore } from 'src/stores/drawerHotelStore'

const { hotel } = defineProps<{
  hotel: Hotel
}>()
const carrouselImages = computed(() => Array.from(new Set([hotel.thumb, ...hotel.images])))

const drawerHotelStore = useDrawerHotelStore()

function openDrawer() {
  drawerHotelStore.openDrawer(hotel)
}
</script>

<template>
  <div class="hotel-card__container" style="width: 100%">
    <div class="hotel-card__details__container">
      <hotel-carousel :images="carrouselImages" />
      <hotel-card-details
        :address="hotel.address"
        :amenities="hotel.amenities"
        :name="hotel.name"
        :stars="hotel.stars"
        :hasRefundableRoom="hotel.hasRefundableRoom"
      />
    </div>
    <hotel-card-values @open-drawer="openDrawer" :value="hotel.price" />
  </div>
</template>

<style lang="scss">
.hotel-card {
  &__container {
    width: 100%;
    display: grid;
    grid-template-columns: 80% 20%;
    gap: 0.5rem;

    @media (max-width: 800px) {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }
}
</style>
