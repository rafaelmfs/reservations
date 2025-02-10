<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHotelsStore } from 'src/stores/hotelsStore'
import { computed } from 'vue'

const hotelsStore = useHotelsStore()
const { filters, isFiltered } = storeToRefs(hotelsStore)

const currentPage = computed(() => {
  const defaultMessage = 'Hospedagem'
  if (isFiltered.value && filters.value.destiny?.label) {
    const filterCityName = filters.value.destiny?.label.split(',')[0]
    return `${defaultMessage} em ${filterCityName}`
  }

  return defaultMessage
})
</script>

<template>
  <q-breadcrumbs class="text-grey-5 bread-cumbs">
    <template v-slot:separator>
      <q-icon size="1.5rem" name="chevron_right" color="primary" />
    </template>

    <q-breadcrumbs-el label="Início" />
    <q-breadcrumbs-el label="Hotéis" />
    <q-breadcrumbs-el :label="currentPage" />
  </q-breadcrumbs>
</template>

<style lang="scss">
@media (max-width: 500px) {
  .bread-cumbs {
    font-size: 1rem;
  }
}
</style>
