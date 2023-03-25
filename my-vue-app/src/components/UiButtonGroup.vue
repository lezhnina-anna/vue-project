<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'UiButtonGroup',

  provide() {
    return {
      currentValue: computed(() => this.modelValue),
      updateCurrentValue: this.updateCurrentValue,
    };
  },

  props: {
    modelValue: {
      required: true,
    },
  },

  emits: ['update:modelValue'],

  methods: {
    updateCurrentValue(value) {
      this.$emit('update:modelValue', value);
    },
  },
};
</script>
<style scoped>
/* _button-group.css */
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
