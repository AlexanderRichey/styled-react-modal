export const isInView = element => {
  const bounding = element.getBoundingClientRect();
  let viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= viewportHeight &&
    bounding.right <= viewportWidth
  );
};
