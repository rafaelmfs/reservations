<template>
  <div class="reserve-form__container">
    <div class="reserve-form__header">
      <h1>Reservar hotel</h1>
    </div>
    <filter-hotels-form />
  </div>

  <div class="bredcrumbs__order">
    <breadcumb-pages />
    <sort-dropdown />
  </div>

  <hotels-list />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import FilterHotelsForm from '../components/form/filter-hotels-form.vue'
import BreadcumbPages from 'src/components/breadcumb-pages.vue'
import SortDropdown from 'src/components/sort-dropdown.vue'
import { useHotelsStore } from 'src/stores/hotelsStore'
import HotelsList from 'src/components/hotels/hotels-list.vue'

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
    border-bottom: 1px solid $grey-6;
    h1 {
      margin: 0;
      font-size: 2rem;
      line-height: 1;
      color: $grey-6;
      font-weight: 500;
    }
  }
}

.bredcrumbs__order {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  align-items: center;
}
</style>
