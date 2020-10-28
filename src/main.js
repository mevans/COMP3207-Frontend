import {createApp} from 'vue'
import App from "./App";
import router from './router'

// Mount the root component on the element with the id of app
const app = createApp(App);
app.use(router);
app.mount('#app');
