<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHotelsStore } from 'src/stores/hotelsStore'
import hotelCard from './hotel-card.vue'

const hotelsStore = useHotelsStore()
const { hotels, pagination } = storeToRefs(hotelsStore)

function onLoad(_: number, done: (stop: boolean) => void) {
  hotelsStore.loadMoreHotels()
  done(pagination.value.currentPage > pagination.value.lastPage)
}
</script>

<template>
  <q-infinite-scroll v-show="!hotelsStore.isLoading" class="hotels-list__container" @load="onLoad">
    <hotel-card v-for="(item, index) in hotels" :key="index" :hotel="item" />

    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<style lang="scss">
.hotels-list {
  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
