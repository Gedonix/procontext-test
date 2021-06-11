<template>
  <div class="container">
    <div class="column">
      <div class="wrapper">        
        <list 
        v-for="number in countOfLists"
        :key="number"
        :number="number"/>
      </div>
    </div>
    <div class="column">
      <div class="wrapper">
        <vision
        v-for="number in countOfLists"
        :key="number"
        :number="number"
        />
      </div>      
    </div>

  </div>
</template>

<script>
import List from './components/AppList.vue'
import Vision from './components/AppVision.vue'

export default {
  name: 'App',
  computed: {
    countOfLists() {
      return this.$store.getters.countOfLists
    }
  },
  components: {
    List,
    Vision
  }
}
</script>