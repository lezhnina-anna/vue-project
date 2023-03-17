<template>
  <div :class="`toast toast_${type}`">
    <ui-icon class="toast__icon" :icon="$options.icons[type]" />
    <span>{{ text }}</span>
  </div>
</template>

<script>
import UiIcon from '../../components/UiIcon.vue';

const icons = {
  success: 'check-circle',
  error: 'alert-circle',
};

export default {
  name: 'ToastItem',

  icons,

  components: { UiIcon },

  props: {
    type: {
      type: String,
      default: 'success',
    },
    text: {
      type: String,
    },
  },
};
</script>
