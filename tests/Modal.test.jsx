import "@testing-library/jest-dom/extend-expect";

import React, { useState } from "react";
import styled from "styled-components";
import { render, fireEvent } from "@testing-library/react";
import Modal, { ModalProvider } from "../src";

function StatefulModal(props) {
  const { isOpen: propsIsOpen, ...rest } = props;
  const [isOpen, setIsOpen] = useState(propsIsOpen);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button onClick={toggleModal}>open</button>
      <button id="useless-button">useless</button>
      <Modal isOpen={isOpen} closeModal={toggleModal} {...rest}>
        <div>
          <p tabIndex="-1">hello</p>
          <button>first</button>
          <button id="close-button" onClick={toggleModal}>
            close
          </button>
          <button>last</button>
        </div>
      </Modal>
    </div>
  );
}

function renderWithProvider(modalProps = {}, providerProps = {}) {
  const finalModalProps = {
    isOpen: false,
    ...modalProps
  };

  return render(
    <ModalProvider data-testid="provider" {...providerProps}>
      <StatefulModal {...finalModalProps} />
    </ModalProvider>
  );
}

describe("<Modal />", () => {
  it("renders nothing when not open", () => {
    const { queryByText } = renderWithProvider();
    expect(queryByText("hello")).toBeNull();
  });

  it("renders children when open", () => {
    const { getByText } = renderWithProvider({ isOpen: true });
    expect(getByText("hello")).toBeTruthy();
  });

  it("should have role=dialog and aria-modal=true", () => {
    const { getByRole } = renderWithProvider({ isOpen: true });
    expect(getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("should focus first tabbable element after open", () => {
    const { getByText } = renderWithProvider({ isOpen: true });
    expect(getByText("first")).toHaveFocus();
  });

  it("should focus element with elToFocusAfterOpenId after open", () => {
    const { getByText } = renderWithProvider({
      isOpen: true,
      elToFocusAfterOpenId: "close-button"
    });
    expect(getByText("close")).toHaveFocus();
  });

  it("should focus last focused element before opening the modal after closing it", () => {
    const { getByText } = renderWithProvider();
    const openButton = getByText("open");
    openButton.focus();
    fireEvent.click(openButton);
    fireEvent.click(getByText("close"));
    expect(getByText("open")).toHaveFocus();
  });

  it("should focus element with elToFocusAfterCloseId after close", () => {
    const { getByText } = renderWithProvider({
      isOpen: true,
      elToFocusAfterCloseId: "useless-button"
    });
    fireEvent.click(getByText("close"));
    expect(getByText("useless")).toHaveFocus();
  });

  it("should focus first tabbable element when Tab key is pressed while the last tabbable element is focused", () => {
    const { getByText } = renderWithProvider({
      isOpen: true
    });
    getByText("last").focus();
    fireEvent.keyDown(document, { keyCode: 9 });
    expect(getByText("first")).toHaveFocus();
  });

  it("should focus last tabbable element when Shift + Tab keys are pressed while the first tabbable element is focused", () => {
    const { getByText } = renderWithProvider({
      isOpen: true
    });
    fireEvent.keyDown(document, { keyCode: 9, shiftKey: true });
    expect(getByText("last")).toHaveFocus();
  });

  it("should focus first focusable element (with tabindex=-1) if first tabbable element isn't in view", () => {
    // window.innerHeight=768 , window.innerWidth=1024
    // mock getBoundingClientRect to make the elements out of viewport so isInView will return false
    Element.prototype.getBoundingClientRect = () => ({
      width: 150,
      height: 50,
      top: 900,
      left: 0,
      bottom: 950,
      right: 150
    });
    const { getByText } = renderWithProvider({ isOpen: true });
    // the first focusable element (tabindex=-1) will have focus because the first tabbable element isn't in view
    expect(getByText("hello")).toHaveFocus();
    // revert to the original jsdom getBoundingClientRect implementation again
    Element.prototype.getBoundingClientRect = () => ({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    });
  });

  it("calls closeModal() when the background is clicked while closeOnBackgroundClick is true (default: false)", () => {
    const spy = jest.fn();
    const { getByTestId } = renderWithProvider({
      isOpen: true,
      closeModal: spy,
      closeOnBackgroundClick: true,
      backgroundProps: { "data-testid": "background" }
    });
    fireEvent.click(getByTestId("background"));
    expect(spy.mock.calls.length).toBe(1);
  });

  it("calls onBackgroundClick() when the background is clicked", () => {
    const spy = jest.fn();
    const { getByTestId } = renderWithProvider({
      onBackgroundClick: spy,
      isOpen: true,
      backgroundProps: { "data-testid": "background" }
    });
    fireEvent.click(getByTestId("background"));
    expect(spy.mock.calls.length).toBe(1);
  });

  it("calls closeModal() when the escape key is pressed while closeOnEscapeKeydown is true (default: true)", () => {
    const spy = jest.fn();
    renderWithProvider({
      isOpen: true,
      closeModal: spy
    });
    fireEvent.keyDown(document, { key: "Escape" });
    expect(spy.mock.calls.length).toBe(1);
  });

  it("calls onEscapeKeydown() when the escape key is pressed", () => {
    const spy = jest.fn();
    renderWithProvider({
      isOpen: true,
      onEscapeKeydown: spy
    });
    fireEvent.keyDown(document, { key: "Escape" });
    expect(spy.mock.calls.length).toBe(1);
  });

  it("calls beforeOpen() before it opens", () => {
    const spy = jest.fn();
    const { getByText } = renderWithProvider({
      beforeOpen: spy
    });
    fireEvent.click(getByText("open"));
    expect(spy.mock.calls.length).toBe(1);
  });

  it("calls afterOpen() after it opens", () => {
    const spy = jest.fn();
    const { getByText } = renderWithProvider({
      afterOpen: spy
    });
    fireEvent.click(getByText("open"));
    expect(spy.mock.calls.length).toBe(1);
  });

  it("calls beforeClose() before it closes", () => {
    const spy = jest.fn();
    const { getByText } = renderWithProvider({
      isOpen: true,
      beforeClose: spy
    });
    fireEvent.click(getByText("close"));
    expect(spy.mock.calls.length).toBe(1);
  });

  it("calls afterClose() after it closes", () => {
    const spy = jest.fn();
    const { getByText } = renderWithProvider({
      isOpen: true,
      afterClose: spy
    });
    fireEvent.click(getByText("close"));
    expect(spy.mock.calls.length).toBe(1);
  });

  it("passes background props to background", () => {
    const Background = styled.div`
      background: ${props => props.color || "green"};
    `;

    const { getByTestId } = renderWithProvider(
      {
        isOpen: true,
        backgroundProps: { color: "blue", "data-testid": "background" }
      },
      {
        backgroundComponent: Background
      }
    );

    expect(getByTestId("background")).toHaveStyle(`background: blue`);
  });
});

describe("Modal.styled()", () => {
  it("returns to a <Modal /> instance", () => {
    const StyledModal = Modal.styled`
      background-color: green;
    `;

    const { getByRole } = render(
      <ModalProvider>
        <StyledModal isOpen={true}>
          <button>close</button>
        </StyledModal>
      </ModalProvider>
    );
    expect(getByRole("dialog")).toHaveStyle(`background-color: green`);
  });
});

describe("Nested <Modal />", () => {
  const NestedModals = () => {
    const [isFirstOpen, setIsFirstOpen] = useState(true);
    const [isSecondOpen, setIsSecondOpen] = useState(false);
    const toggleFirst = () => {
      setIsFirstOpen(!isFirstOpen);
    };
    const toggleSecond = () => {
      setIsSecondOpen(!isSecondOpen);
    };
    return (
      <ModalProvider>
        <Modal isOpen={isFirstOpen} closeModal={toggleFirst}>
          <div>
            <button onClick={toggleSecond}>open second</button>
            <button onClick={toggleFirst}>close first</button>
          </div>
        </Modal>
        <Modal isOpen={isSecondOpen} closeModal={toggleSecond}>
          <div>
            <button onClick={toggleSecond}>close second</button>
          </div>
        </Modal>
      </ModalProvider>
    );
  };
  it("should close the last opened modal when Escape key is pressed", () => {
    const { queryByText, getByText } = render(<NestedModals />);
    fireEvent.click(getByText("open second"));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(queryByText("close second")).toBeNull();
    expect(getByText("close first")).toBeTruthy();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(queryByText("close first")).toBeNull();
  });
});
