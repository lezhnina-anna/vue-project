<template>
  <div class="toasts">
    <toast-item v-for="(toast, index) in toasts" :key="index" :type="toast.type" :text="toast.text" />
  </div>
</template>

<script>
import ToastItem from './Toast.vue';

export default {
  name: 'TheToaster',

  timeout: 5000,

  components: {
    ToastItem,
  },

  data() {
    return {
      toasts: new Set(),
      count: 0,
    };
  },

  methods: {
    success: function (text) {
      this.createToast('success', text);
    },
    error: function (text) {
      this.createToast('error', text);
    },
    createToast: function (type, text, timeout = this.$options.timeout) {
      const toast = { type, text, id: this.count };
      this.toasts.add(toast);
      this.count++;

      setTimeout(() => {
        this.toasts.delete(toast);
      }, timeout);
    },
  },
};
</script>

<style scoped>
/* _toaster.css */
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
