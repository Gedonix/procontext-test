<template>
  <div class="list_entry">
      <div class="angle">
          <i :class="checked ? 'fas fa-angle-down' : 'fas fa-angle-right'"></i>         
      </div>
      <div>
        <label class="checkbox_list">
        <input type="checkbox" :value="checked" @input="toggle" 
        class="checkbox_list_input" :class="inputStyle"             
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
        inputStyle() {
            if(this.checked && this.checkedItems){
                return "checkbox_list_minus"
            } else if(this.checked){
                return "checkbox_list_open"
            } else {
                return "checkbox_list_close"
            }
        },
        countOfItems() {
            return this.$store.getters.countOfItems
        },
        checkedItems() {
            if(this.$store.getters.checkedItems[this.number] < 4){
                return true
            } else {
                return false
            }
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
