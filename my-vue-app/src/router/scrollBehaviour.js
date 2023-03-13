/** @implements {import('vue-router').RouterScrollBehavior} */
export function scrollBehavior(to, from, savedPosition) {
  if (from.meta.saveScrollPosition && to.meta.saveScrollPosition) {
    return false;
  } else if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
    };
  } else if (savedPosition) {
    return savedPosition;
  } else {
    return { top: 0, left: 0 };
  }
}
