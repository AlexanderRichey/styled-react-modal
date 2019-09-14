import React, { useState, useRef, useEffect, cloneElement } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { Consumer } from "./context";
import { manageFocus } from "./utils/manageFocus";
import { tabbableChildren } from "./utils/tabbableChildren";
import { isInView } from "./utils/isInView";
import { firstFocusableChild } from "./utils/firstFocusableChild";
import { isCurrentModal } from "./utils/isCurrentModal";

function Modal({
  WrapperComponent,
  children,
  closeModal,
  closeOnBackgroundClick = false,
  onBackgroundClick,
  closeOnEscapeKeydown = true,
  onEscapeKeydown,
  allowScroll,
  beforeOpen,
  afterOpen,
  beforeClose,
  afterClose,
  backgroundProps,
  isOpen: isOpenProp,
  elToFocusAfterOpenId,
  elToFocusAfterCloseId,
  ...rest
}) {
  const backgroundEl = useRef(null);
  const modalEl = useRef(null);
  const prevBodyOverflowStyle = useRef(null);
  const lastFocusedEl = useRef(null);
  const modalTabbableChildren = useRef(null);
  const firstTabbableEl = useRef(null);
  const lastTabbableEl = useRef(null);
  const firstFocusableEl = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [wasOpen, setWasOpen] = useState(false);

  // Handle changing isOpen state and deal with *before* isOpen change
  // callbacks
  useEffect(() => {
    function handleChange(callback, setter) {
      if (callback) {
        try {
          callback().then(() => setter(isOpenProp));
        } catch (e) {
          setter(isOpenProp);
        }
      } else {
        setter(isOpenProp);
      }
    }

    if (isOpen !== isOpenProp) {
      if (isOpenProp) {
        lastFocusedEl.current = document.activeElement;
        handleChange(beforeOpen, setIsOpen);
      } else {
        handleChange(beforeClose, setIsOpen);
      }
    }
  }, [isOpen, setIsOpen, isOpenProp, beforeOpen, beforeClose]);

  // Handle *after* isOpen change callbacks
  useEffect(() => {
    if (isOpen) {
      if (modalEl.current) {
        modalTabbableChildren.current = tabbableChildren(modalEl.current);
        if (modalTabbableChildren.current.length === 0) {
          throw new Error(
            "Modal should always have at least one tabbable element. Maybe a button like Close, OK or Cancel."
          );
        }
        firstTabbableEl.current = modalTabbableChildren.current[0];
        lastTabbableEl.current =
          modalTabbableChildren.current[
            modalTabbableChildren.current.length - 1
          ];
        // in case of nested modals: when the last modal is closed it will automatically focus the
        // lastFocusedEl which may not be the same as (elToFocusAfterOpenId element, firstFocusableEl or firstTabbableEl)
        // so we prevent focusing them if the focused element is already a child of the current modal
        if (!modalTabbableChildren.current.includes(document.activeElement)) {
          if (elToFocusAfterOpenId) {
            modalEl.current.querySelector(`#${elToFocusAfterOpenId}`).focus();
            // if the first tabbable element not in viewport because of the length of text
            // developer should give first paragraph tabindex=-1 to make it focusable
          } else if (!isInView(firstTabbableEl.current)) {
            firstFocusableEl.current = firstFocusableChild(modalEl.current);
            // if there is a focusable element focus it
            if (firstFocusableEl.current) {
              firstFocusableEl.current.focus();
              // if not throw an error
            } else {
              throw new Error(
                "The first tabbable element isn't in viewport. You can fix this by putting it in the top of the modal or give tabindex=-1 to the first paragraph in modal which will be automatically focused."
              );
            }
          } else {
            firstTabbableEl.current.focus();
          }
        }
      }
      setWasOpen(true);
      afterOpen && afterOpen();
    } else {
      // to make sure this will not run unless this modal was opened recently
      if (wasOpen) {
        if (elToFocusAfterCloseId) {
          document.querySelector(`#${elToFocusAfterCloseId}`).focus();
        } else {
          lastFocusedEl.current && lastFocusedEl.current.focus();
        }
        setWasOpen(false);
        afterClose && afterClose();
      }
    }
  }, [
    isOpen,
    afterOpen,
    wasOpen,
    afterClose,
    elToFocusAfterOpenId,
    elToFocusAfterCloseId
  ]);

  // Handle ESC keydown
  useEffect(() => {
    function handleKeydown(e) {
      manageFocus(e, firstTabbableEl.current, lastTabbableEl.current);
      if (e.key === "Escape") {
        // check if the onEscapeKeydown is passed in as a prop
        // and in case of multiple opened modals close the last one only
        if (isCurrentModal(modalEl.current)) {
          closeOnEscapeKeydown && closeModal();
          onEscapeKeydown && onEscapeKeydown(e);
        }
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, closeModal, closeOnEscapeKeydown, onEscapeKeydown, afterOpen]);

  // Handle changing document.body styles based on isOpen state
  useEffect(() => {
    if (isOpen && !allowScroll) {
      prevBodyOverflowStyle.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (!allowScroll) {
        document.body.style.overflow = prevBodyOverflowStyle.current || "";
      }
    };
  }, [isOpen, allowScroll]);

  function handleBackgroundClick(e) {
    if (backgroundEl.current === e.target) {
      closeOnBackgroundClick && closeModal();
      onBackgroundClick && onBackgroundClick(e);
    }
  }

  // Rendering stuff
  let content;
  if (WrapperComponent) {
    content = (
      <WrapperComponent {...rest} ref={modalEl}>
        {children}
      </WrapperComponent>
    );
  } else {
    // this will throw error if children aren't a single react element
    React.Children.only(children);
    // add props to children element
    content = cloneElement(children, {
      ref: modalEl,
      role: "dialog",
      "aria-modal": true
    });
  }

  return (
    <Consumer>
      {({ modalNode, BackgroundComponent }) => {
        if (modalNode && BackgroundComponent && isOpen) {
          return ReactDOM.createPortal(
            <BackgroundComponent
              {...backgroundProps}
              onClick={handleBackgroundClick}
              ref={backgroundEl}
            >
              {content}
            </BackgroundComponent>,
            modalNode
          );
        } else {
          return null;
        }
      }}
    </Consumer>
  );
}

Modal.styled = function(...args) {
  const styles =
    styled.div.attrs({
      role: "dialog",
      "aria-modal": true
    })`
      ${css(...args)}
    ` ||
    styled.div.attrs({
      role: "dialog",
      "aria-modal": true
    })``;
  return function(props) {
    return <Modal WrapperComponent={styles} {...props} />;
  };
};

Modal.defaultProps = {
  backgroundProps: {}
};

export default Modal;
