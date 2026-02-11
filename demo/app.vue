<script lang="ts" setup>
import {computed} from 'vue'
import {routePages} from "./routePages";

const pages = computed(()=>{
  return routePages.filter(x=>x.path!=='/')
})
</script>

<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-xl">PiMath Demo</h1>
      <RouterLink to="/">Accueil</RouterLink>
    </div>

    <div class="flex mb-10 gap-3">
      <RouterLink v-for="route in pages" :key="route.name"
                  :to="route.path">{{ route.name }}
      </RouterLink>
    </div>

    <main>
      <RouterView/>
    </main>
  </div>
</template>

<style scoped>

</style>