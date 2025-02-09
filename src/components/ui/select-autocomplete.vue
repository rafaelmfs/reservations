<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { PlaceStorage } from 'src/storage/places/Places'
import { useHotelsStore } from 'src/stores/hotelsStore'
import { ref } from 'vue'

const placesStorage = new PlaceStorage()
const places = placesStorage.getAllPlaces().map((place) => ({
  label: `${place.name}, ${place.state.shortname}`,
  value: place.placeId,
  description: `${place.name}, ${place.state.name}`,
}))

const hotelsStore = useHotelsStore()
const { filters } = storeToRefs(hotelsStore)

const options = ref(places)

function filterFn(inputValue: string, update: (callbackFn: () => void) => void) {
  console.log(inputValue)
  if (inputValue === '') {
    update(() => {
      options.value = places
    })
    console.log('Dentro do if')

    return
  }

  update(() => {
    const needle = inputValue.toLowerCase()
    options.value = places.filter((place) => place.label.toLowerCase().includes(needle))
  })
}
</script>

<template>
  <div>
    <label class="autocomplete-label" for="select">Destino</label>
    <q-select
      use-input
      clearable
      hide-dropdown-icon
      outlined
      dense
      v-model="filters.destiny"
      id="select"
      option-label="description"
      :placeholder="filters.destiny?.label ? '' : 'Selecione uma opção'"
      @filter="filterFn"
      :options="options"
      :display-value="filters.destiny?.label"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            <slot></slot>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<style lang="scss">
.q-field__inner {
  box-shadow: 0 2px 8px #bbbbbb60;
}

.autocomplete-label {
  color: $gray-500;
  font-weight: 500;
  font-size: 1rem;

  &::after {
    content: '*';
    color: red;
  }
}
</style>
