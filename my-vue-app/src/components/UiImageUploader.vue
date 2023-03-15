<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state === $options.states.UPLOADING }"
      :style="path && `--bg-url: url('${path}')`"
      @click="clearInput"
    >
      <span v-if="text" class="image-uploader__text">{{ text }}</span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @change="onChange"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  states: {
    EMPTY: 'empty',
    UPLOADING: 'uploading',
    FILLED: 'filled',
  },

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['select', 'upload', 'remove', 'error'],

  data() {
    return {
      state: this.$options.states.EMPTY,
      path: undefined,
      wasError: false,
    };
  },

  computed: {
    text() {
      switch (this.state) {
        case this.$options.states.EMPTY:
          return 'Загрузить изображение';
        case this.$options.states.UPLOADING:
          return 'Загрузка...';
        case this.$options.states.FILLED:
          return 'Удалить изображение';
        default:
          return undefined;
      }
    },
  },

  created() {
    if (this.preview) {
      this.path = this.preview;
      this.state = this.$options.states.FILLED;
    }
  },

  methods: {
    onChange() {
      const file = this.$refs.input.files[0];
      this.$emit('select', file);
      this.path = URL.createObjectURL(file);

      this.uploadFile(file);
    },
    uploadFile(file) {
      if (!this.uploader) {
        this.state = this.$options.states.FILLED;
        return;
      }

      this.state = this.$options.states.UPLOADING;

      this.uploader(file)
        .then((res) => {
          this.$emit('upload', res);
          this.state = this.$options.states.FILLED;
        })
        .catch((e) => {
          this.$emit('error', e);
          this.wasError = true;
          this.clearInput();
        });
    },
    clearInput(e) {
      if (
        (this.state === this.$options.states.EMPTY || this.state === this.$options.states.UPLOADING) &&
        !this.wasError
      ) {
        return;
      }

      e && e.preventDefault();
      this.$emit('remove');
      this.$refs.input.value = null;
      this.state = this.$options.states.EMPTY;
      this.path = '';
      this.wasError = false;
    },
  },
};
</script>

<style scoped>
/* _image-uploader.css */

.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
