import { useAuthStore } from '../stores/useAuthStore';
import { storeToRefs } from 'pinia/dist/pinia';

/** @implements {import('vue-router').NavigationGuard} */

export function authGuard(to) {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  if (!isAuthenticated.value && to.meta.authorizedOnly) {
    return { name: 'login', query: { from: to.path } };
  }

  if (isAuthenticated.value && to.meta.unauthorizedOnly) {
    return { name: 'index' };
  }

  return true;
}
