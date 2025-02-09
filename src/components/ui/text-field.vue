<template>
  <div>
    <label for="name-field">Buscar por nome (Opcional)</label>
    <q-input id="name-field" outlined v-model="text" dense />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    return {
      text: ref(''),
      ph: ref(''),
      dense: ref(false),
    }
  },
}
</script>

<style lang="scss">
label {
  color: $gray-500;
  font-weight: 500;
  font-size: 1rem;
}
</style>
