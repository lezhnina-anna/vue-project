import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  const addDefaultContainer = () => document.body.appendChild(document.createElement('div'));
  const progressInstance = createApp(TheTopProgressBar).mount(container ?? addDefaultContainer());

  if (router) {
    router.beforeEach(progressInstance.start);

    router.afterEach(progressInstance.finish);

    router.onError((e) => {
      progressInstance.fail();
      throw e;
    });
  }

  const progress = {
    start: progressInstance.start,
    finish: progressInstance.finish,
    fail: progressInstance.fail,

    /** @implements {import('@vue/runtime-core').PluginInstallFunction} */
    install(app) {
      app.provide(PROGRESS_KEY, progress);
    },
  };

  return progress;
}
