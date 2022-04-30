console.time('11');
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VConsole from 'vconsole';
import App from './App.vue';
import router from './router';
import { Button as NutButton, Signature as NutSignature } from '@nutui/nutui';
const app = createApp(App);

app
.use(NutButton)
.use(NutSignature)

app.use(router)
.use(createPinia()).mount('#app');

const vConsole = new VConsole({ maxLogNumber: 1000 });
console.log(vConsole, 'vConsole init');
