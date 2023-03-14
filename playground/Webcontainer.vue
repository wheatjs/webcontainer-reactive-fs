<script setup lang="ts">
import { ref } from 'vue'
import { WebContainer } from '@webcontainer/api'
import { createReactiveFs } from '../src'

const container = await WebContainer.boot()
const fs = createReactiveFs(container)

const readValue = ref('')
const readme = fs.useFile('./readme.md')

readme.value = 'Hello World'

const write = () => {
  container.fs.writeFile('./readme.md', 'Overwritten')
}

const read = () => {
  container.fs.readFile('./readme.md', 'utf-8')
    .then(value => readValue.value = value)
}
</script>

<template>
  <div>
    Hello from webcontainer
    <div>
      <button @click="write">
        Write
      </button>
      <button @click="read">
        Read
      </button>
    </div>

    <textarea v-model="readme" />

    <div>Manual Read Value: {{ readValue }}</div>
  </div>
</template>
