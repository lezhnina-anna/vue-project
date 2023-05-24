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
          <div class="meetup__aside-buttons">
            <template v-if="canEdit">
              <UiButton variant="primary" class="meetup__aside-button" tag="RouterLink" :to="{ name: 'editMeetup', params: { meetupId } }">Редактировать</UiButton>
              <UiButton variant="danger" class="meetup__aside-button" @click="handleDeleteMeetupButtonClick">Удалить</UiButton>
            </template>
            <UiButton
              v-if="meetup.attending"
              variant="secondary"
              class="meetup__aside-button"
              @click="handleLeaveMeetupButtonClick"
              @disabled="isDisabled">
              Отменить участие
            </UiButton>
            <UiButton v-else-if="isAuthenticated" variant="primary" class="meetup__aside-button" @click="handleAttendMeetupButtonClick" @disabled="isDisabled">
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
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useApi } from '../composables/useApi';

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
    const router = useRouter();
    const route = useRoute();
    const isDisabled = ref(false);

    const canEdit = computed(() => isAuthenticated && props.meetup.organizer === user.value?.fullname);

    const updateParticipant = async (handler) => {
      const { request, result, isLoading } = useApi(handler,{ showProgress: true, successToast: 'Сохранено', errorToast: true })

      isDisabled.value = isLoading.value;
      await request(props.meetup.id);
      if (result.value.success) {
        emit('update');
      }
      isDisabled.value = isLoading.value;
    };

    const handleAttendMeetupButtonClick = () => {
      updateParticipant(attendMeetup);
    };

    const handleLeaveMeetupButtonClick = () => {
      updateParticipant(leaveMeetup);
    };

    const handleDeleteMeetupButtonClick = async () => {
      const { request, result, isLoading } = useApi(deleteMeetup,{ showProgress: true, successToast: 'Митап удалён', errorToast: true })

      isDisabled.value = isLoading.value;
      await request(props.meetup.id);
      if (result.value.success) {
        router.push({ name: 'meetups' });
      }
      isDisabled.value = isLoading.value;
    };

    const meetupId = route.params.meetupId;

    return {
      canEdit,
      isDisabled,
      isAuthenticated,
      meetupId,
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
