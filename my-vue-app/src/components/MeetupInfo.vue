<template>
  <ul class="meetup-info">
    <li>
      <UiIcon icon="search" class="meetup-info__icon"/>
      {{ organizer }}
    </li>
    <li>
      <UiIcon icon="map" class="meetup-info__icon"/>
      {{ place }}
    </li>
    <li>
      <UiIcon icon="cal-lg" class="meetup-info__icon"/>
      <time :datetime="isoDate">{{ localDate }}</time>
    </li>
  </ul>
</template>

<script>
// TODO: Task 02-components/03-MeetupInfo
// TODO: Add <UiIcon>
// TODO: Add date utils

import UiIcon from '../components/UiIcon.vue';

export default {
  name: 'MeetupInfo',

  components: {
    UiIcon,
  },

  props: {
    organizer: {
      type: String,
      required: true,
    },

    place: {
      type: String,
      required: true,
    },

    date: {
      type: Number,
      required: true,
    },
  },

  computed: {
    isoDate() {
      return new Date(this.date).toISOString().split('T')[0];
    },

    localDate() {
      return new Date(this.date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
</script>

<style scoped>
/* _meetup-info.css */

.meetup-info {
  margin: 0;
  padding: 0;
}

.meetup-info li {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.meetup-info li:last-child {
  margin: 0;
}

.meetup-info__icon {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
