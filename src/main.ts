import { router } from '@app/router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app');
