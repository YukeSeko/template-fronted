<template>
  <div id="app">
    <router-view />
<!--    <template v-if="route.path.startsWith('/user')">-->
<!--      <router-view />-->
<!--    </template>-->
<!--    <template v-else>-->
<!--      <router-view />-->
<!--    </template>-->
  </div>
</template>

<style>
#app {
  height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute();
</script>