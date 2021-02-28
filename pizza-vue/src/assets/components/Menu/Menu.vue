<template>
  <nav class="menu">
    <categories></categories>
    <sorts></sorts>
  </nav>
</template>

<script>
import menuStyles from '../../../sass/menu.sass'

import Categories from './Categories'
import Sorts from './Sorts'
export default {
  name: 'Menu',
  components: {
    Categories,
    Sorts
  }
}
</script>