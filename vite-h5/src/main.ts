import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VConsole from 'vconsole';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router).use(createPinia()).mount('#app');

const vConsole = new VConsole({ maxLogNumber: 1000 });
console.log(vConsole, 'vConsole init');
