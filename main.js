import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import 'bootstrap'; // Import JS của Bootstrap
import '@fortawesome/fontawesome-svg-core'

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
