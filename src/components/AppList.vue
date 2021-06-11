<template>
  <div class="list_entry">
      <div class="angle">
          <i :class="checked ? 'fas fa-angle-down' : 'fas fa-angle-right'"></i>         
      </div>
      <div>
        <label class="checkbox_label">
        <input type="checkbox" :value="checked" @input="toggle"               
        /> List {{ number }}</label>
      </div>      
  </div>
  <div class="item_wrapper" v-if="checked">
        <item 
        v-for="inumber in countOfItems"
        :key="inumber"
        :inumber="inumber"
        :number="number"
        />
    </div>
</template>

<script>
import Item from './AppItem.vue'

export default {
    props: ['number'],
    data() {
        return {
            checked: false,
            isFilled: false,
        }
    },
    methods: {
        toggle() {
            this.checked = !this.checked
            this.$store.commit({
                type: 'setActive',
                number: this.number,
                checked: this.checked
                })
        }
    },
    computed: { 
        countOfItems() {
            return this.$store.getters.countOfItems
        },
    },
    components: {
        Item
    },
    mounted() {
        this.$store.commit('registerList', this.number)
    },      
}
</script>
