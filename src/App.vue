<script setup lang="ts">
import botbar from './components/botbar.vue'
</script>
<template>
<router-view v-slot="{ Component }">
  <keep-alive include="search">
    <component :is="Component" />
  </keep-alive>
</router-view>
  <botbar></botbar>
</template>
<style lang="scss">
* {
  margin: 0;
  padding: 0
}

a {
  text-decoration: none;
  color: inherit;
}

ul>li {
  list-style: none;
}
</style>