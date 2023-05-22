import {watch, reactive} from 'vue';
import { useRouter } from 'vue-router';

const DEFAULTS = {
  view: 'list',
  date: 'all',
  participation: 'all'
};

export function useQuerySync(filter, view) {
  const router = useRouter();
  let query = reactive({});

  watch(view, (value) => {
    if (value === DEFAULTS.view) {
      delete query.view;
    } else {
      query.view = value;
    }
  });

  watch(filter, (value) => {
    for (const property in value) {
      const propValue = value[property];

      if (propValue.length === 0 || propValue === DEFAULTS[property]) {
        delete query[property];
      } else {
        query[property] = value[property];
      }
    }
  }, {
    deep: true
  });

  watch(
    () => ({ ...query }),
    (query) => {
      router.push({ query });
    }
  );
}
