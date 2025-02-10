<template>
  <q-layout class="layout__container" view="hHh lpr fFr">
    <q-header class="layout__header">
      <img src="../assets/logo.png" alt="" />
    </q-header>
    <q-page-container class="layout__page-content">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.layout {
  &__container {
    background-color: $grey-1;
  }
  &__header {
    background-color: #fff;
    box-shadow: 0 2px 16px #0002;
    padding: 0.5rem 2rem;

    img {
      width: 8rem;
      height: auto;
    }
  }

  &__page-content {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 3rem;
    padding: 2rem 8rem;

    @media (max-width: 1440px) {
      padding: 2rem 4rem;
    }
  }
}
</style>
