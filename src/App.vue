<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user/login')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout/>
    </template>
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
import BasicLayout from "@/basicLayout"
const route = useRoute();
</script>