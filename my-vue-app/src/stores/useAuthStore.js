import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { loginUser, logoutUser } from '../api/authApi';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);

  const setUser = (value) => {
    user.value = value;
  };

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    user.value = response.data;

    return response;
  };

  const logout = async () => {
    await logoutUser();
    user.value = null;
  };

  return {
    user,
    isAuthenticated,
    setUser,
    login,
    logout,
  };
});
