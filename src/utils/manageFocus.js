export const manageFocus = (e, firstTabbableEl, lastTabbableEl) => {
  // Check for TAB key press
  if (e.keyCode === 9) {
    // SHIFT + TAB
    if (e.shiftKey) {
      if (document.activeElement === firstTabbableEl) {
        e.preventDefault();
        lastTabbableEl && lastTabbableEl.focus();
      }

      // TAB
    } else {
      if (document.activeElement === lastTabbableEl) {
        e.preventDefault();
        firstTabbableEl && firstTabbableEl.focus();
      }
    }
  }
};
