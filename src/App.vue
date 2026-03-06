<template>
  <div ref="scaleRef">
    <Dashboard />
  </div>
</template>

<script setup>
import { useScale } from './composables/useScale.js'
import Dashboard from './views/Dashboard.vue'

const { scaleRef } = useScale()
</script>

<style>
@import './assets/styles/global.css';
</style>
