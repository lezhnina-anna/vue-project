import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { loginUser, logoutUser } from '../api/authApi';
import { saveUser, clearUser, getUser } from '../services/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(getUser());
  const isAuthenticated = computed(() => !!user.value);

  const setUser = (value) => {
    user.value = value;

    saveUser(value);
  };

  const update = async () => {
    const response = await getUser();

    if (response.success) {
      setUser(response.data);
    }
  };

  const login = async (email, password) => {
    const response = await loginUser(email, password);

    setUser(response.data);

    return response;
  };

  const logout = async () => {
    await logoutUser();
    user.value = null;

    clearUser();
  };

  return {
    user,
    isAuthenticated,
    setUser,
    login,
    logout,
    update,
  };
});
