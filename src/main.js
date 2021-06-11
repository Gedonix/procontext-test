import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js'
import './css/style.css'
import './css/fontawesome/css/all.css'

createApp(App)
    .use(store)
    .mount('#app')