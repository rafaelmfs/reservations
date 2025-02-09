<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { OrderByTypes } from 'src/stores/hotelsStore'
import { useHotelsStore } from 'src/stores/hotelsStore'
import { computed } from 'vue'

const hotelsStore = useHotelsStore()
const { sortedBy } = storeToRefs(hotelsStore)

const orderByLabels: Array<{
  label: string
  value: OrderByTypes
}> = [
  { label: 'Recomendados', value: 'price' },
  { label: 'Melhor Avaliados', value: 'rating' },
]

const orderedByLabel = computed(
  () => orderByLabels.find((item) => item.value === sortedBy?.value)?.label,
)

function handleSelectOrderBy(value: OrderByTypes) {
  hotelsStore.sortingHotels(value)
}
</script>

<template>
  <div>
    <span class="text-grey-5">Organizar por</span>
    <q-btn-dropdown
      flat
      dense
      no-caps
      color="primary"
      dropdown-icon="expand_more"
      class="dropdown-button"
      :ripple="false"
      :label="orderedByLabel"
    >
      <q-list>
        <q-item
          clickable
          v-close-popup
          v-for="item in orderByLabels"
          :key="item.value"
          @click="handleSelectOrderBy(item.value)"
        >
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<style lang="scss">
.dropdown-button {
  font-style: italic;
  .q-btn-dropdown__arrow {
    margin-left: 0;
  }

  &:hover {
    background-color: transparent;

    & .q-focus-helper {
      background-color: transparent;
    }
  }
}
</style>
