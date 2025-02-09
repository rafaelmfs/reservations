<template>
  <div class="reserve-form__container">
    <div class="reserve-form__header">
      <h1>Reservar hotel</h1>
    </div>
    <filter-hotels-form />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import FilterHotelsForm from '../components/filter-hotels-form.vue'
import { useHotelsStore } from 'src/stores/hotelsStore'

const hotelsStore = useHotelsStore()

onMounted(async () => {
  await hotelsStore.loadHotels()
})
</script>

<style lang="scss">
.reserve-form {
  &__container {
    width: 100%;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 0 10px #0001;
  }
  &__header {
    padding: 1rem 2rem;
    border-bottom: 1px solid $gray-600;
    h1 {
      margin: 0;
      font-size: 2rem;
      line-height: 1;
      color: $gray-600;
      font-weight: 500;
    }
  }
}
</style>
