<template>
  <LayoutMeetupForm v-if="meetup" title="Редактирование митапа">
    <MeetupForm :meetup="meetup" submitText="Сохранить" @cancel="cancel" @submit="submit" />
  </LayoutMeetupForm>
  <UiContainer v-else>
    <UiAlert>Загрузка...</UiAlert>
  </UiContainer>
</template>

<script>
import { ref } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import UiAlert from '../components/UiAlert.vue';
import UiContainer from '../components/UiContainer.vue';
import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
import { useHead } from 'unhead';
import { getMeetup, putMeetup} from '../api/meetupsApi';
import { useRouter } from 'vue-router/dist/vue-router';
import { postImage } from '../api/imageApi';
import { useApi } from '../composables/useApi';

export default {
  name: 'PageEditMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupForm,
    LayoutMeetupForm
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  async beforeRouteEnter(to) {
    const result = await getMeetup(+to.params.meetupId);
    if (result.success) {
      return (vm) => {
        vm.setMeetup(result.data);
      };
    } else {
      return { name: 'meetups' };
    }
  },

  setup() {
    useHead({
      title: 'Редактирование митапа | Meetups'
    })

    const meetup = ref(null);
    const router = useRouter();

    const setMeetup = (value) => {
      meetup.value = value
    };

    const cancel = () => {
      router.push({ name: 'meetup', params: { meetupId: meetup.value.id } });
    };

    const submit = async (meetup) => {
      if (meetup.imageToUpload) {
        const responseImage = await postImage(meetup.imageToUpload);
        meetup.imageId  = responseImage?.data?.id;
      }

      const { request, result } = useApi(putMeetup, { showProgress: true, successToast: 'Сохранено', errorToast: true });

      await request(meetup);

      if (result.value.success) {
        router.push({ name: 'meetup', params: { meetupId: meetup.id } });
      }
    };

    return {
      meetup,
      setMeetup,
      cancel,
      submit
    };
  },
};
</script>

<style scoped></style>
