/**
 * main.js - главная точка входа (entrypoint)
 * Именно в этом файле запускается и инициализируется всё приложение
 */

import { createApp } from 'vue';
import { router } from './router/index.js';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createToaster } from './plugins/toaster';
import { createProgress } from './plugins/progress';

// TODO: установить плагины: head(title), progress
createApp(App)
  .use(router)
  .use(createPinia())
  .use(createToaster())
  .use(
    createProgress({
      undefined,
      router,
    }),
  )
  .mount('#app');

// В этом же файле при необходимости можно сделать всё, что требуется делать ещё до создания приложения,
// или что не относится к Vue приложению и UI
