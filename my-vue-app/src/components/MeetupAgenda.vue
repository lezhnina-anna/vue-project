<template>
  <ul class="agenda">
    <li class="agenda__item">
      <MeetupAgendaItem v-for="agendaItem in agenda" :agenda-item="agendaItem"/>
    </li>
  </ul>
</template>

<script>
import MeetupAgendaItem from './MeetupAgendaItem.vue';

export default {
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },

}
</script>

<style scoped>
/* _agenda.css */
.agenda {
  margin: 0;
  padding: 0;
  list-style: none;
}
.agenda__item {
  border-top: 1px solid var(--grey-3);
}
.agenda__item:first-child {
  border-top: none;
}
</style>
