import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            countOfLists: 5,
            countOfItems: 4,
            Elements: {},
            checkedLists: [],
            checkedItems: [0],
            colors: ['#000000', '#FF0000', '#FFFF00', '#008000', '#0000FF']
        }
    },
    mutations: {
        setActive(state, pld) {
            pld.checked ?
                state.checkedLists.push(pld.number) :
                state.checkedLists = state.checkedLists.filter(e => e !== pld.number)
        },
        registerList(state, pld) {
            state.Elements = {...state.Elements, [pld]: {} }
            for (let i = 1; i < state.countOfItems + 1; i++) {
                state.Elements = {...state.Elements,
                    [pld]: {
                        ...state.Elements[pld],
                        [i]: { checked: true, count: 5, color: state.colors[i] }
                    }
                }
            }
            state.checkedItems.push(4)
        },
        toggle(state, pld) {
            state.Elements = {...state.Elements,
                [pld.number]: {
                    ...state.Elements[pld.number],
                    [pld.inumber]: {...state.Elements[pld.number][pld.inumber], checked: pld.checked }
                }
            }
            pld.checked ? state.checkedItems[pld.number]++ : state.checkedItems[pld.number]--
        },
        changeColor(state, pld) {
            state.Elements = {...state.Elements,
                [pld.number]: {
                    ...state.Elements[pld.number],
                    [pld.inumber]: {...state.Elements[pld.number][pld.inumber], color: pld.color }
                }
            }
        },
        changeCount(state, pld) {
            state.Elements = {...state.Elements,
                [pld.number]: {
                    ...state.Elements[pld.number],
                    [pld.inumber]: {...state.Elements[pld.number][pld.inumber], count: pld.count }
                }
            }
        },
        reduceCount(state, pld) {
            let c = state.Elements[pld.number][pld.inumber].count
            state.Elements = {...state.Elements,
                [pld.number]: {
                    ...state.Elements[pld.number],
                    [pld.inumber]: {...state.Elements[pld.number][pld.inumber], count: c - 1 }
                }
            }
        }
    },
    getters: {
        countOfLists(state) {
            return state.countOfLists
        },
        countOfItems(state) {
            return state.countOfItems
        },
        checkedLists(state) {
            return state.checkedLists
        },
        checkedItems(state) {
            return state.checkedItems
        },
        getElements(state) {
            return state.Elements
        },
    }
})