<template>
  <div class="item_entry">
      <div>
        <label class="checkbox_item">
        <input type="checkbox" :checked="checked" @input="toggle"/>
        Item {{ inumber }}</label>
      </div>
      <div class="color_wrapper">
          <input type="text" class="cinput" :value="count" @change="changeCount($event)" @focus="$event.target.value = ''" />
          <input type="color" :value="color" @input="changeColor($event)" class="color_box">
      </div>
      
  </div>
</template>

<script>
export default {
  props: ['inumber', 'number'],
  data() {
    return {          
    }
  },
  methods: {
    toggle() {   
      this.$store.commit({
        type: 'toggle',
        number: this.number,
        inumber: this.inumber,
        checked: !this.checked
      })
    },
    changeColor(event) {  
      this.$store.commit({
        type: 'changeColor',
        number: this.number,
        inumber: this.inumber,
        color: event.target.value
      })
    },
    changeCount(event) {
      let count = +event.target.value      
      if(isNaN(count) || event.target.value === '' || count < 0){
        count = 0
      } else if(count > 50) {
        count = 50
      }
      this.$store.commit({
        type: 'changeCount',
        number: this.number,
        inumber: this.inumber,
        count
      })
    },     
  },  
  computed: {
    checked() {
      return this.$store.getters.getElements[this.number][this.inumber].checked
    },
    count() {
      return this.$store.getters.getElements[this.number][this.inumber].count
    },
    color() {
      return this.$store.getters.getElements[this.number][this.inumber].color
    }
  },
}
</script>
