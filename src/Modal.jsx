import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Consumer } from "./context";

function Modal({
  WrapperComponent,
  children,
  onBackgroundClick,
  onEscapeKeydown,
  allowScroll,
  beforeOpen,
  afterOpen,
  beforeClose,
  afterClose,
  backgroundProps,
  isOpen: isOpenProp,
  ...rest
}) {
  const node = useRef(null);
  const prevBodyOverflowStyle = useRef(null);
  const isMounted = useRef(false);

  const [isOpen, setIsOpen] = useState(false);

  const onEscapeKeydownCallback = useCallback(onEscapeKeydown);
  const onBackgroundClickCallback = useCallback(onBackgroundClick);

  const beforeOpenCallback = useCallback(beforeOpen);
  const afterOpenCallback = useCallback(afterOpen);
  const beforeCloseCallback = useCallback(beforeClose);
  const afterCloseCallback = useCallback(afterClose);

  // Handle changing isOpen state and *before* isOpen change callbacks
  useEffect(() => {
    function handleChange(callback) {
      if (callback) {
        try {
          callback().then(() => setIsOpen(isOpenProp));
        } catch (e) {
          setIsOpen(isOpenProp);
        }
      } else {
        setIsOpen(isOpenProp);
      }
    }

    if (isOpen !== isOpenProp) {
      if (isOpenProp) {
        handleChange(beforeOpenCallback);
      } else {
        handleChange(beforeCloseCallback);
      }
    }
  }, [
    isMounted,
    isOpen,
    setIsOpen,
    isOpenProp,
    beforeOpenCallback,
    beforeCloseCallback
  ]);

  // Handle *after* isOpen change callbacks
  useEffect(() => {
    if (isOpen) {
      afterOpenCallback && afterOpenCallback();
    } else {
      // The isMounted bit prevents the afterCloseCallback from getting called
      // on the initial mount
      isMounted.current && afterCloseCallback && afterCloseCallback();
    }
  }, [isMounted, isOpen, afterOpenCallback, afterCloseCallback]);

  // Handle Escape keydown
  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "Escape") {
        onEscapeKeydownCallback && onEscapeKeydownCallback(e);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, onEscapeKeydownCallback]);

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

  // Keep track of whether the modal is mounted to prevent misfiring callbacks
  useEffect(() => {
    isMounted.current = true;
  }, [isMounted]);

  function handleBackgroundClick(e) {
    if (node.current === e.target) {
      onBackgroundClickCallback && onBackgroundClickCallback(e);
    }
  }

  let content;
  if (WrapperComponent) {
    content = <WrapperComponent {...rest}>{children}</WrapperComponent>;
  } else {
    content = children;
  }

  return (
    <Consumer>
      {({ modalNode, BackgroundComponent }) => {
        if (modalNode && BackgroundComponent && isOpen) {
          return ReactDOM.createPortal(
            <BackgroundComponent
              {...backgroundProps}
              onClick={handleBackgroundClick}
              ref={node}
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

Modal.styled = function (...args) {
  const wrap = args ? styled.div(...args) : styled.div();

  return function (props) {
    return <Modal WrapperComponent={wrap} {...props} />;
  };
};

Modal.defaultProps = {
  backgroundProps: {}
};

export default Modal;
