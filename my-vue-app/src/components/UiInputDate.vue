<template>
  <UiInput :modelValue="value" v-bind="$attrs" :type="type" @change="onChange">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';
import moment from 'moment';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: String,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    value() {
      if (!this.modelValue) {
        return '';
      }

      const utcDate = moment(this.modelValue).utc();

      switch (this.type) {
        case 'time':
          return utcDate.format('HH:mm');
        case 'datetime-local':
          return utcDate.format('YYYY-MM-DDTHH:mm');
        case 'date':
          return utcDate.format('YYYY-MM-DD');
        default:
          return '';
      }
    },
  },

  methods: {
    onChange(e) {
      this.$emit('update:modelValue', e.target.valueAsNumber);
    },
  },
};
</script>
