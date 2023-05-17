<template>
  <LayoutMeetupForm>
    <MeetupForm :meetup="meetup" submitText="Создать" @cancel="cancel" @submit="submit" />
  </LayoutMeetupForm>
</template>

<script>
import { ref } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
import { createMeetup } from '../services/meetupService.js';
import { useRouter } from 'vue-router/dist/vue-router';
import { postMeetup } from '../api/meetupsApi';
import { useToaster } from '../plugins/toaster';
import { postImage } from '../api/imageApi';
import { useHead } from 'unhead';

export default {
  name: 'PageCreateMeetup',

  components: {
    MeetupForm,
    LayoutMeetupForm,
  },

  setup() {
    useHead({
      title: 'Создание митапа | Meetups'
    })
    const meetup = ref(createMeetup());
    const router = useRouter();
    const toaster = useToaster();

    const cancel = () => {
      router.push({ name: 'index' });
    };

    const submit = async (meetup) => {
      const responseImage = meetup.imageToUpload ? await postImage(meetup.imageToUpload) : null;
      const imageId = responseImage?.data?.id || -1;

      if (!meetup.imageToUpload || responseImage.success) {
        const response = await postMeetup({ ...meetup, imageId });

        if (response.success) {
          router.push({ name: 'meetup', params: { meetupId: response.data.id } });
        } else {
          toaster.error(response.error.message);
        }
      }
    };

    return {
      meetup,
      cancel,
      submit,
    };
  },
};
</script>

<style scoped></style>
