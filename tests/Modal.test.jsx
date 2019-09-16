import "@testing-library/jest-dom/extend-expect";

import React, { useState } from "react";
import styled from "styled-components";
import { render, fireEvent } from "@testing-library/react";
import Modal, { ModalProvider } from "../src";

function StatefulModal(props) {
  const { isOpen: propsIsOpen, ...rest } = props;
  const [isOpen, setIsOpen] = useState(propsIsOpen);
  return (
    <div>
      <button data-testid="button" onClick={() => setIsOpen(!isOpen)}>
        Click me
      </button>
      <Modal isOpen={isOpen} {...rest}>
        <span data-testid="content">Hello world</span>
      </Modal>
    </div>
  );
}

function renderWithProvider(modalProps = {}, providerProps = {}) {
  const finalModalProps = {
    isOpen: false,
    onBackgroundClick: jest.fn(),
    onEscapeKeyDown: jest.fn(),
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
    expect(queryByText("Hello world")).toBeNull();
  });

  it("renders children when open", () => {
    const { getByText } = renderWithProvider({ isOpen: true });
    expect(getByText("Hello world")).toBeTruthy();
  });

  it("calls onBackgroundClick when the background is clicked", () => {
    const spy = jest.fn();
    const { getByTestId } = renderWithProvider({
      onBackgroundClick: spy,
      isOpen: true,
      backgroundProps: { "data-testid": "background" }
    });
    fireEvent.click(getByTestId("background"));
    expect(spy.mock.calls.length).toBe(1);
  });

  it("calls onEscapeKeydown when the escape key is pressed", () => {
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
    const sleeper = jest.fn();
    const { getByTestId } = renderWithProvider({
      beforeOpen: spy,
      beforeClose: sleeper
    });
    fireEvent.click(getByTestId("button"));
    expect(spy.mock.calls.length).toBe(1);
    expect(sleeper).not.toHaveBeenCalled();
  });

  it("calls afterOpen() after it opens", () => {
    const spy = jest.fn();
    const sleeper = jest.fn();
    const { getByTestId } = renderWithProvider({
      afterOpen: spy,
      afterClose: sleeper
    });
    fireEvent.click(getByTestId("button"));
    expect(spy.mock.calls.length).toBe(1);
    expect(sleeper).not.toHaveBeenCalled();
  });

  it("calls beforeClose() before it closes", () => {
    const spy = jest.fn();
    const sleeper = jest.fn();
    const { getByTestId } = renderWithProvider({
      isOpen: true,
      beforeClose: spy,
      beforeOpen: sleeper
    });
    fireEvent.click(getByTestId("button"));
    expect(spy.mock.calls.length).toBe(1);
    expect(sleeper.mock.calls.length).toBe(1);
  });

  it("calls afterClose() after it closes", () => {
    const spy = jest.fn();
    const sleeper = jest.fn();
    const { getByTestId } = renderWithProvider({
      isOpen: true,
      afterClose: spy,
      afterOpen: sleeper
    });
    fireEvent.click(getByTestId("button"));
    expect(spy.mock.calls.length).toBe(1);
    expect(sleeper.mock.calls.length).toBe(1);
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

    const { getByTestId } = render(
      <ModalProvider>
        <StyledModal isOpen={true} data-testid="modal" />
      </ModalProvider>
    );

    expect(getByTestId("modal")).toHaveStyle(`background-color: green`);
  });
});
