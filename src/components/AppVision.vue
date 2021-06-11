<template>
  <div class="vblock_wrapper">
    <div class="vblock">
          <p>List {{number}}</p>
          <button v-if="isActive" @click="unsort">{{ isSorted ? 'Перемешать' : 'Сортировать' }}</button>
    </div>      
    <div class="legend" v-if="isActive">
        <div v-if="isSorted">
            <div
            v-for="(items, idx) in pos"
            :key="idx"
            >
                <div v-if="items.checked" class="count_container">
                    <div class="count_div"
                    v-for="element in items.count"
                    :key="element"
                    :style="{ backgroundColor: items.color}"
                    @click="delBlock(idx)"
                    >
                    </div>
                </div>
            </div>                    
        </div>
        <div v-else class="count_container">
            <div class="count_div"
            v-for="(element, idx) in unsorted"
            :key="idx"
            :style="{ backgroundColor: element}"
            @click="delUnsort(element)">
            </div>
        </div> 
    </div>
  </div>
</template>

<script>
export default {
    props: ['number'],
    data() {
        return {
            isSorted: true,
        }
    },
    methods: {
        unsort() {
            this.isSorted = !this.isSorted            
        },
        delBlock(idx) {
            this.$store.commit({
                type: 'reduceCount',
                number: this.number,
                inumber: idx + 1
            })            
        },
        delUnsort(color) {
            this.$store.commit({
                type: 'reduceCount',
                number: this.number,
                inumber: this.pos.findIndex(i => i.color === color) + 1
            }) 
        }
    },
    computed: {
        isActive() {
            return this.$store.getters.checkedLists.includes(this.number)
        },
        countOfItems() {
            return this.$store.getters.countOfItems
        },
        pos() {
            let apos = []
            for (let i = 1; i < this.countOfItems + 1; i++) {
                apos.push({
                    checked: this.$store.getters.getElements[this.number][i].checked,
                    color: this.$store.getters.getElements[this.number][i].color,
                    count: this.$store.getters.getElements[this.number][i].count
                })
            }
            return apos
        },
        unsorted() {
            let unsorted = []
            this.pos.forEach(element => {
                if (element.checked) {
                    for (let i = 0; i < element.count; i++) {
                        unsorted.push(element.color)
                    }
                }
            })            
            for (let i = 0; i < unsorted.length; i++){
                let x = Math.floor(Math.random() * unsorted.length)
                let tmp = unsorted[i]
                unsorted[i] = unsorted[x]
                unsorted[x] = tmp
            }
            return unsorted
        }
    }
}
</script>
