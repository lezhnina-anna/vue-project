<template>
  <ul class="agenda">
    <li class="agenda__item">
      <MeetupAgendaItem v-for="agendaItem in agenda" :agenda-item="agendaItem"/>
    </li>
  </ul>
</template>

<script>
import MeetupAgendaItem from './MeetupAgendaItem';

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
