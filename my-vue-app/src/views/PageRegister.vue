<template>
  <LayoutAuth>
    <UiForm @submit="handleSubmit">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" required />
      </UiFormGroup>
      <UiFormGroup label="Имя">
        <UiInput v-model="fullname" name="fullname" required />
      </UiFormGroup>
      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" required minlength="6" />
      </UiFormGroup>
      <UiFormGroup label="Повтор пароля">
        <UiInput v-model="password2" type="password" required minlength="6" />
      </UiFormGroup>
      <UiFormGroup>
        <UiCheckbox v-model="agree" name="agree" required>Я согласен с условиями</UiCheckbox>
      </UiFormGroup>

      <template #buttons>
        <UiButton variant="primary" type="submit">Зарегистрироваться</UiButton>
      </template>

      <template #append>
        Уже есть аккаунт?
        <UiLink :to="{ name: 'login' }">Войдите</UiLink>
      </template>
    </UiForm>
  </LayoutAuth>
</template>

<script>
import { ref } from 'vue';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiInput from '../components/UiInput.vue';
import UiCheckbox from '../components/UiCheckbox.vue';
import UiLink from '../components/UiLink.vue';
import UiButton from '../components/UiButton.vue';
import UiForm from '../components/UiForm.vue';
import LayoutAuth from '../components/LayoutAuth.vue';
import { useToaster } from '../plugins/toaster';
import { registerUser } from '../api/authApi';
import { useRouter } from 'vue-router';
import { useHead } from 'unhead';

export default {
  name: 'PageRegister',

  components: {
    UiForm,
    UiButton,
    UiLink,
    UiCheckbox,
    UiInput,
    UiFormGroup,
    LayoutAuth,
  },

  setup() {
    useHead({
      title: 'Регистрация | Meetups'
    })

    const toaster = useToaster();
    const router = useRouter();

    const email = ref('');
    const fullname = ref('');
    const password = ref('');
    const password2 = ref('');
    const agree = ref(false);

    const validate = () => {
      if (password.value !== password2.value) {
        return 'Пароли не совпадают';
      }
      if (!agree.value) {
        return 'Требуется согласится с условиями';
      }
    };

    const handleSubmit = async () => {
      const validationError = validate();

      if (validationError) {
        toaster.error(validationError);
        return;
      }

      const result = await registerUser({
        fullname: fullname.value,
        email: email.value,
        password: password.value,
      });

      if (result.success) {
        router.push({ name: 'login' });
        toaster.success('Регистрация выполнена успешно');
      } else {
        toaster.error(result.error.message);
      }
    };

    return {
      email,
      fullname,
      password,
      password2,
      agree,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
