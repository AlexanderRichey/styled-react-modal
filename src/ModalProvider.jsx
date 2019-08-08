import React, { useState, useEffect, useRef } from "react";
import { BaseModalBackground } from "./baseStyles";
import { Provider } from "./context";

export default function ModalProvider({
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
