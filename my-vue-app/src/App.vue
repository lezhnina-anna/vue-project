<template>
  <LayoutBase>
    <RouterView>
      <template #default="{ Component }">
        <KeepAlive v-if="Component" :max="3">
          <component :is="Component" />
        </KeepAlive>
      </template>
      <template #fallback>
        <UiAlert>Загрузка...</UiAlert>
      </template>
    </RouterView>
  </LayoutBase>
</template>

<script>
import LayoutBase from './components/LayoutBase.vue';
import UiAlert from './components/UiAlert.vue';
import { httpClient } from './api/httpClient/httpClient.js';
import { clearUser } from './services/authService.js';
import { useAuthStore } from './stores/useAuthStore';
import { storeToRefs } from 'pinia/dist/pinia';
import { useHead } from 'unhead'
import { useToaster } from './plugins/toaster';

export default {
  name: 'App',

  components: {
    UiAlert,
    LayoutBase,
  },

  setup() {
    useHead({
      title: 'Meetups'
    });
    const toaster = useToaster();

    const authStore = useAuthStore();
    const { update } = authStore;
    const { isAuthenticated } = storeToRefs(authStore);

    if (isAuthenticated.value) {
      update();
    }

    httpClient.onUnauthenticated(() => {
      clearUser();
      window.location.reload();
    });

    httpClient.onNetworkError(() => {
      toaster.error('Потеряно соединение с интернетом');
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
      toaster.error(event.reason);
    });
  },
};
</script>

<style>
/* Основные глобальные стили - не scoped стили  */
/* app.css */
@import url('./assets/styles/_variables.css');
@import url('./assets/styles/_fonts.css');
@import url('./assets/styles/_common.css');
</style>
