import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import * as ElIcons from '@element-plus/icons-vue';

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus);

for (const [key, component] of Object.entries(ElIcons)) {
  app.component(key, component);
}

app.mount('#app')
