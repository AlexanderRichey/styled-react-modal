import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
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
        handleChange(beforeOpen);
      } else {
        handleChange(beforeClose);
      }
    }
  }, [isMounted, isOpen, setIsOpen, isOpenProp, beforeOpen, beforeClose]);

  // Handle *after* isOpen change callbacks
  useEffect(() => {
    if (isOpen) {
      afterOpen && afterOpen();
    } else {
      // The isMounted bit prevents the afterClose from getting called
      // on the initial mount
      isMounted.current && afterClose && afterClose();
    }
  }, [isMounted, isOpen, afterOpen, afterClose]);

  // Handle Escape keydown
  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "Escape") {
        onEscapeKeydown && onEscapeKeydown(e);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, onEscapeKeydown]);

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
      onBackgroundClick && onBackgroundClick(e);
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

Modal.propTypes = {
  WrapperComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  onBackgroundClick: PropTypes.func,
  onEscapeKeydown: PropTypes.func,
  allowScroll: PropTypes.bool,
  beforeOpen: PropTypes.func,
  afterOpen: PropTypes.func,
  beforeClose: PropTypes.func,
  afterClose: PropTypes.func,
  backgroundProps: PropTypes.object,
  isOpen: PropTypes.bool
};

export default Modal;
