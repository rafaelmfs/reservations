<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHotelsStore } from 'src/stores/hotelsStore'
import hotelCard from './hotel-card/hotel-card.vue'
import { computed } from 'vue'

const hotelsStore = useHotelsStore()
const { hotels, pagination } = storeToRefs(hotelsStore)

const noResults = computed(() => !hotels.value.length)
const showNoMoreItems = computed(
  () => !noResults.value && pagination.value.currentPage > pagination.value.lastPage,
)

function loadMoreHotels(_: number, done: (stop: boolean) => void) {
  hotelsStore.loadMoreHotels()
  done(pagination.value.currentPage > pagination.value.lastPage)
}
</script>

<template>
  <q-infinite-scroll
    :offset="250"
    v-show="!hotelsStore.isLoading"
    class="hotels-list__container"
    @load="loadMoreHotels"
  >
    <hotel-card v-for="(item, index) in hotels" :key="index" :hotel="item" />

    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
  <p v-show="showNoMoreItems" class="no-more-results">Não há mais resultados.</p>
  <p v-show="noResults" class="no-more-results">Nenhum resultado encontrado.</p>
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

.no-results {
  font-size: 1.25rem;
  line-height: 2rem;
  margin: 2rem 0;
  padding-bottom: 1rem;
  font-weight: 500;
  color: $grey-5;
}
</style>
