<template>
  <div>
    <label for="name-field">Buscar por nome (Opcional)</label>
    <q-input id="name-field" outlined v-model="filters.name" dense />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHotelsStore } from 'src/stores/hotelsStore'

const hotelsStore = useHotelsStore()
const { filters } = storeToRefs(hotelsStore)
</script>

<style lang="scss">
label {
  color: $grey-5;
  font-weight: 500;
  font-size: 1rem;
}
</style>
