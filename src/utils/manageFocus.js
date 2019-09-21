export const manageFocus = (e, firstTabbableEl, lastTabbableEl) => {
  // Check for TAB key press
  if (e.keyCode === 9) {
    // only one tabbable element
    if (
      firstTabbableEl === lastTabbableEl &&
      firstTabbableEl === document.activeElement
    ) {
      e.preventDefault();
      // SHIFT + TAB
    } else if (e.shiftKey && document.activeElement === firstTabbableEl) {
      e.preventDefault();
      lastTabbableEl.focus();
      // TAB
    } else if (document.activeElement === lastTabbableEl) {
      e.preventDefault();
      firstTabbableEl.focus();
    }
  }
};
