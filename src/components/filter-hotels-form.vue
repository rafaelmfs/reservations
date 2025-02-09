<template>
  <form action="" class="reserve-form__form">
    <div class="reserve-form__form__inputs">
      <select-autocomplete />
      <text-field />
    </div>
    <custom-button @click="hotelsStore.filterHotels">{{ buttonText }}</custom-button>
  </form>
</template>

<script setup lang="ts">
import SelectAutocomplete from '../components/ui/select-autocomplete.vue'
import TextField from '../components/ui/text-field.vue'
import CustomButton from '../components/ui/custom-button.vue'
import { computed } from 'vue'
import { useHotelsStore } from 'src/stores/hotelsStore'
import { storeToRefs } from 'pinia'

const hotelsStore = useHotelsStore()
const { isFiltered } = storeToRefs(hotelsStore)

const buttonText = computed(() => {
  return isFiltered.value ? 'Alterar busca' : 'Buscar'
})
</script>

<style lang="scss">
.reserve-form__form {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
