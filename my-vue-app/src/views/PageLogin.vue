<template>
  <LayoutAuth>
    <UiForm @submit="handleSubmit">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" placeholder="demo@email" required />
      </UiFormGroup>
      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" placeholder="password" required />
      </UiFormGroup>

      <template #buttons>
        <UiButton variant="primary" type="submit" block>Войти</UiButton>
      </template>

      <template #append>
        Нет аккаунта?
        <UiLink :to="{ name: 'register' }" class="link">Зарегистрируйтесь</UiLink>
      </template>
    </UiForm>
  </LayoutAuth>
</template>

<script>
import { ref } from 'vue';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiLink from '../components/UiLink.vue';
import UiInput from '../components/UiInput.vue';
import UiButton from '../components/UiButton.vue';
import UiForm from '../components/UiForm.vue';
import LayoutAuth from '../components/LayoutAuth.vue';
import { useToaster } from '../plugins/toaster';
import { useRouter, useRoute } from 'vue-router/dist/vue-router';
import { useAuthStore } from '../stores/useAuthStore';

export default {
  name: 'PageLogin',

  components: {
    UiForm,
    UiButton,
    UiInput,
    UiLink,
    UiFormGroup,
    LayoutAuth,
  },

  setup() {
    // TODO: <title> "Вход | Meetups"

    const email = ref('');
    const password = ref('');

    const toaster = useToaster();
    const router = useRouter();
    const route = useRoute();
    const { login } = useAuthStore();

    const handleSubmit = async () => {
      const result = await login(email.value, password.value);

      if (result.success) {
        router.push(route.query.from ?? '/');
        toaster.success('Авторизация прошла успешно');
      } else {
        toaster.error('Неверные учётные данные...');
      }
    };

    return {
      email,
      password,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
