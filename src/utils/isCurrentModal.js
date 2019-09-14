export const isCurrentModal = modalEl => {
  const modals = Array.from(
    document.querySelectorAll("[role=dialog][aria-modal=true]")
  );
  const lastModal = modals[modals.length - 1];
  return lastModal === modalEl;
};
