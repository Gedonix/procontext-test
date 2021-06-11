<template>
  <div class="list_entry">
      <div class="angle">
          <i :class="checked ? 'fas fa-angle-down' : 'fas fa-angle-right'"></i>         
      </div>
      <div>
        <label class="checkbox_list">
        <input type="checkbox" :value="checked" @input="toggle" 
        :style="inputStyle"             
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
        inputStyle() {
            if(this.checked && this.checkedItems){
                return "background: url(./assets/minus-square-regular.svg) 0 0 no-repeat"
            } else if(this.checked){
                return "background: url(./assets/check-square-regular.svg) 0 0 no-repeat"
            } else {
                return "background: url(./assets/square-regular.svg) 0 0 no-repeat"
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
