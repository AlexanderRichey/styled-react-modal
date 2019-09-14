export const tabbableChildren = element =>
  Array.from(element.querySelectorAll("*"))
    .filter(el => el.tabIndex >= 0)
    .sort((a, b) => a.tabIndex - b.tabIndex);
