import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal, { ModalProvider } from "styled-react-modal";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  & > :not(:last-child) {
    margin-right: 16px;
  }
`;

// first way using the built in styled function which will return an accessible wrapper div
const ModalStyled = Modal.styled`
width: fit-content;
height: fit-content;
text-align: center;
padding: 16px;
border-radius: 0.375rem;
background-color: white;
color: black;
overflow-y: auto;
max-height: 80vh;
max-width: 80vw;
`;

// second way using styled from styled-components which can be rendered as children of Modal
const StyledModal = styled.div`
  height: fit-content;
  text-align: center;
  padding: 16px;
  border-radius: 0.375rem;
  background-color: white;
  color: black;
  overflow-y: auto;
  max-height: 80vh;
  max-width: 80vw;
`;

// third way using inline styling or css classes or css modules
const styles = {
  height: "fit-content",
  textAlign: "center",
  padding: "16px",
  borderRadius: "0.375rem",
  backgroundColor: "white",
  color: "black",
  overflowY: "auto",
  maxHeight: "80vh",
  maxWidth: "80vw"
};

// read more about modal dialog accessibility best practices here https://www.w3.org/TR/wai-aria-practices/#dialog_modal
// or check an example here https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html#

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const toggleSecondModal = () => {
    setIsSecondModalOpen(!isSecondModalOpen);
  };
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const toggleThirdModal = () => {
    setIsThirdModalOpen(!isThirdModalOpen);
  };
  return (
    <ModalProvider>
      {/* many buttons just to show that the last focusable button before openning 
      the modal will be focused again when it's closed */}
      <FlexContainer>
        <button onClick={toggleModal}>Show first modal 1</button>
        <button onClick={toggleModal}>Show first modal 2</button>
        <button onClick={toggleModal}>Show first modal 3</button>
        <button onClick={toggleModal} id="after-close-modal-1">
          Show first modal 4
        </button>
      </FlexContainer>
      {/* this modals content is taken from w3.org modal dialog 
      example: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html# */}

      {/* order of modals here doesn't matter on how the escape key will be handled 
      because the last opened modal will always be the last modal in the DOM
      and will be closed first when Escape is pressed */}

      {/* aria-labelledby and aria-describedby are used to make the Modal fully accessible */}
      {/* the element with id="after-close-modal-1" will be focused after the modal is closed 
      ignoring the last focused element before opening the modal which can be useful in 
      some cases (not in this example for sure)*/}
      <ModalStyled
        isOpen={isModalOpen}
        closeOnBackgroundClick={true}
        closeModal={toggleModal}
        aria-labelledby="modal-label"
        aria-describedby="modal-desc"
        elToFocusAfterCloseId="after-close-modal-1"
        afterOpen={() => {
          console.log("from afterOpen");
        }}
        beforeOpen={() => {
          console.log("from beforeOpen");
        }}
        beforeClose={() => {
          console.log("from beforeClose");
        }}
        afterClose={() => {
          console.log("from afterClose");
        }}
        onBackgroundClick={() => {
          console.log("from onBackgroundClick");
        }}
        onEscapeKeydown={() => {
          console.log("from onEscapeKeydown");
        }}
      >
        {/* ModalStyled will return a styled wrapper div so Modal will still return a single child */}
        <h2 id="modal-label">Verification Result</h2>
        <div id="modal-desc">
          {/* the first paragraph has tabindex=-1 to be focusable because the first tabbable element 
          is out of view because of the length of modal content. Another solution is to simply put a tabbable 
          element in a viewable place in the modal*/}
          <p tabIndex="-1">
            This is just a demonstration. If it were a real application, it
            would provide a message telling whether the entered address is
            valid.
          </p>
          <p>
            For demonstration purposes, this dialog has a lot of text. It
            demonstrates a scenario where:
          </p>
          <ul>
            <li>
              The first interactive element, the help link, is at the bottom of
              the dialog.
            </li>
            <li>
              If focus is placed on the first interactive element when the
              dialog opens, the validation message may not be visible.
            </li>
            <li>
              If the validation message is visible and the focus is on the help
              link, then the focus may not be visible.
            </li>
            <li>
              When the dialog opens, it is important that both:
              <ul>
                <li>
                  The beginning of the text is visible so users do not have to
                  scroll back to start reading.
                </li>
                <li>The keyboard focus always remains visible.</li>
              </ul>
            </li>
          </ul>
          <p>There are several ways to resolve this issue:</p>
          <ul>
            <li>
              Place an interactive element at the top of the dialog, e.g., a
              button or link.
            </li>
            <li>
              Make a static element focusable, e.g., the dialog title or the
              first block of text.
            </li>
          </ul>
          <p>
            Please <em>DO NOT </em> make the element with role dialog focusable!
          </p>
          <ul>
            <li>
              The larger a focusable element is, the more difficult it is to
              visually identify the location of focus, especially for users with
              a narrow field of view.
            </li>
            <li>
              The dialog has a visual border, so creating a clear visual
              indicator of focus when the entire dialog has focus is not very
              feasible.
            </li>
            <li>
              Screen readers read the label and content of focusable elements.
              The dialog contains its label and a lot of content! If a dialog
              like this one has focus, the actual focus is difficult to
              comprehend.
            </li>
          </ul>
          <p>
            In this dialog, the first paragraph has{" "}
            <code>
              tabindex=<q>-1</q>
            </code>
            . The first paragraph is also contained inside the element that
            provides the dialog description, i.e., the element that is
            referenced by <code>aria-describedby</code>. With some screen
            readers, this may have one negative but relatively insignificant
            side effect when the dialog opens -- the first paragraph may be
            announced twice. Nonetheless, making the first paragraph focusable
            and setting the initial focus on it is the most broadly accessible
            option.
          </p>
        </div>
        {/* any buttons or links that fit your needs but they should contain a button to close the modal */}
        <FlexContainer>
          <button onClick={toggleSecondModal}>Open second modal</button>
          <button onClick={toggleThirdModal}>Open third Modal</button>
          <button onClick={toggleModal}>Close</button>
        </FlexContainer>
      </ModalStyled>
      <Modal
        isOpen={isSecondModalOpen}
        closeOnBackgroundClick={true}
        closeModal={toggleSecondModal}
      >
        {/* Modal should only receive a single react element as child */}
        <StyledModal
          aria-labelledby="modal-2-label"
          aria-describedby="modal-2-desc"
        >
          <h1 id="modal-2-label">End of the Road!</h1>
          <p id="modal-2-desc">
            You activated a fake link or button that goes nowhere! The link or
            button is present for demonstration purposes only.
          </p>
          <button onClick={toggleSecondModal}>Close</button>
        </StyledModal>
      </Modal>
      {/* elToFocusAfterOpenId is used to set initial focus instead of focusing the first tabbable element */}
      <Modal
        isOpen={isThirdModalOpen}
        closeOnBackgroundClick={true}
        closeModal={toggleThirdModal}
        elToFocusAfterOpenId="close-modal-3"
      >
        {/* Modal should only receive a single react element as child */}
        <div
          style={styles}
          aria-labelledby="modal-3-label"
          aria-describedby="modal-3-desc"
        >
          <h2 id="modal-3-label">Address Added</h2>
          <p id="modal-3-desc">
            The address you provided has been added to your list of delivery
            addresses. It is ready for immediate use. If you wish to remove it,
            you can do so from <a href="/">your profile.</a>
          </p>
          <FlexContainer>
            {/* Initial focus is set on the OK button, which is the last focusable element. 
            This is for efficiency since most users will simply dismiss the dialog as soon as 
            they have read the message. Users can press Tab to focus on the My Profile link. */}
            <button id="close-modal-3" onClick={toggleThirdModal}>
              OK
            </button>
          </FlexContainer>
        </div>
      </Modal>
    </ModalProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
