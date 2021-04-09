import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { BaseModalBackground } from "./baseStyles";
import { Provider } from "./context";

function ModalProvider({
  backgroundComponent: propsBackgroundComponent,
  children
}) {
  const modalNode = useRef(null);
  const [stateModalNode, setStateModalNode] = useState(null);
  const [BackgroundComponent, setBackgroundComponent] = useState(
    BaseModalBackground
  );

  useEffect(() => {
    if (propsBackgroundComponent) {
      setBackgroundComponent(propsBackgroundComponent);
    }
  }, [setBackgroundComponent, propsBackgroundComponent]);

  useEffect(() => {
    setStateModalNode(modalNode.current);
  }, [setStateModalNode, modalNode]);

  return (
    <Provider
      value={{
        modalNode: stateModalNode,
        BackgroundComponent: BackgroundComponent
      }}
    >
      {children}
      <div ref={modalNode} />
    </Provider>
  );
}

ModalProvider.propTypes = {
  backgroundComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object
  ])
};

export default ModalProvider;
