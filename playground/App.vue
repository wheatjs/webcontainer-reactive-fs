<script setup lang="ts">
import Webcontainer from './Webcontainer.vue'
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <Webcontainer />
      </template>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>
