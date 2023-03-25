<template>
  <div>
    <MeetupCover :title="meetup.title" :image="meetup.image" />

    <UiContainer>
      <div class="meetup">
        <div class="meetup__content">
          <slot />
        </div>
        <div class="meetup__aside">
          <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          <!-- TODO: Реализовать кнопки (некоторые должны быть ссылками) -->
          <div class="meetup__aside-buttons">
            <!-- TODO: Может добавить тут слот? -->
            <template v-if="canEdit">
              <UiButton variant="primary" class="meetup__aside-button">Редактировать</UiButton>
              <UiButton variant="danger" class="meetup__aside-button" @click="handleDeleteMeetupButtonClick"
                >Удалить</UiButton
              >
            </template>
            <UiButton
              v-if="meetup.attending"
              variant="secondary"
              class="meetup__aside-button"
              @click="handleLeaveMeetupButtonClick"
              >Отменить участие</UiButton
            >
            <UiButton v-else variant="primary" class="meetup__aside-button" @click="handleAttendMeetupButtonClick">
              Участвовать
            </UiButton>
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script>
import MeetupCover from './MeetupCover.vue';
import MeetupInfo from './MeetupInfo.vue';
import UiContainer from './UiContainer.vue';
import UiButton from './UiButton.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { storeToRefs } from 'pinia/dist/pinia';
import { attendMeetup, leaveMeetup, deleteMeetup } from '../api/meetupsApi';
import { computed } from 'vue';
import { useToaster } from '../plugins/toaster';
import { useRouter } from 'vue-router';

export default {
  name: 'MeetupView',

  components: {
    UiButton,
    MeetupCover,
    MeetupInfo,
    UiContainer,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  emits: ['update'],

  setup(props, { emit }) {
    const authStore = useAuthStore();
    const { user, isAuthenticated } = storeToRefs(authStore);
    const toaster = useToaster();
    const router = useRouter();

    const canEdit = computed(() => isAuthenticated && props.meetup.organizer === user.fullname);

    const updateParticipant = async (handler) => {
      const response = await handler(props.meetup.id);

      if (response.success) {
        toaster.success('Сохранено');
        emit('update');
      } else {
        toaster.error(response.error.message);
      }
    };

    const handleAttendMeetupButtonClick = () => {
      updateParticipant(attendMeetup);
    };

    const handleLeaveMeetupButtonClick = () => {
      updateParticipant(leaveMeetup);
    };

    const handleDeleteMeetupButtonClick = async () => {
      const response = await deleteMeetup(props.meetup.id);

      if (response.success) {
        router.push({ name: 'meetups' });
        toaster.success('Митап удалён');
      } else {
        toaster.error(response.error.message);
      }
    };

    // TODO: Будет плюсом блокировать кнопку на время загрузки

    return {
      canEdit,
      handleAttendMeetupButtonClick,
      handleLeaveMeetupButtonClick,
      handleDeleteMeetupButtonClick,
    };
  },
};
</script>

<style scoped>
.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup__content {
}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-button {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }
}
</style>
