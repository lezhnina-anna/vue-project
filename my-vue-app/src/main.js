import { createApp } from 'vue';
import { router } from './router/index.js';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createToaster } from './plugins/toaster';
import { createProgress } from './plugins/progress';
import { createHead } from "unhead"

createHead();

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

