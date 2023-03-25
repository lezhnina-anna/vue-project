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

export default {
  name: 'App',

  components: {
    UiAlert,
    LayoutBase,
  },

  setup() {
    // TODO: Установить <title> - "Meetups"

    const authStore = useAuthStore();
    const { update } = authStore;
    const { isAuthenticated } = storeToRefs(authStore);

    if (isAuthenticated.value) {
      update();
    }

    httpClient.onUnauthenticated(clearUser);

    httpClient.onNetworkError(() => {
      // TODO: проблема с сетью, стоит вывести тост пользователю
    });

    // TODO: обработка глобальных ошибок - необработанные исключения можно залогировать и вывести тост
    // TODO: глобальные ошибки можно поймать событиями "error" и "unhandledrejection"
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
