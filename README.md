# Styled React Modal

[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
 [![npm version](https://img.shields.io/npm/v/styled-react-modal.svg)](https://www.npmjs.com/package/styled-react-modal) [![npm downloads](https://img.shields.io/npm/dm/styled-react-modal.svg)](https://www.npmjs.com/package/styled-react-modal) [![CircleCI](https://dl.circleci.com/status-badge/img/gh/AlexanderRichey/styled-react-modal/tree/main.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/AlexanderRichey/styled-react-modal/tree/main) [![codecov](https://codecov.io/gh/AlexanderRichey/styled-react-modal/branch/main/graph/badge.svg)](https://codecov.io/gh/AlexanderRichey/styled-react-modal)

> For support for **react <16.9**, please use **styled-react-modal@1.2.4**.

> For support for **create-react-app <5.0.0**, please import from `styled-react-modal/build/umd`.

Styled React Modal is built with styled-components. It uses the latest React 17.x features and exposes a familiar, easy to use API. It supports `beforeOpen()`, `afterOpen()`, and other lifecycle hooks so that animations can be handled easily. Unlike several other modal implementations in React, it does not pollute the DOM with excessive nodes.

[**Demo on CodeSandbox**](https://codesandbox.io/s/m9jlky57y)

## Install

```
npm i -s styled-react-modal  # or use yarn
```

## Usage

Add the `<ModalProvider>` component near the top of your application's tree.

```js
import React from 'react'
import { ModalProvider } from 'styled-react-modal'
...

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <FancyModalButton />
      </ModalProvider>
    </ThemeProvider>
  )
}
```

Use the `<Modal>` component.

> For instructions on how the make your modal accessible according to the [WAI-ARIA spec](https://www.w3.org/TR/wai-aria-practices/#dialog_modal), see [this CodeSandbox](https://codesandbox.io/s/styled-react-modal-a11y-9uco3?file=/src/index.js).

```js
import Modal from 'styled-react-modal'
...

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.white};
`

function FancyModalButton() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleModal(e) {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <button onClick={toggleModal}>Click me</button>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}>
        <span>I am a modal!</span>
        <button onClick={toggleModal}>Close me</button>
      </StyledModal>
    </div>
  )
}
```

## API

#### Top-Level Exports
- `<ModalProvider>`
- `Modal` \(Default\)
  - `Modal.styled(styles)`
  - `<Modal>`
- `<BaseModalBackground>`

<hr>

### `<ModalProvider>`

Sets the root portal where `<Modal>`s will be rendered.

**Props**

- [`backgroundComponent`] \(Component\): A styled component to be used as the default modal background. If not provided, library defaults will be used.

*Example:*

```js
import { ModalProvider } from 'styled-react-modal'

const SpecialModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  opacity: ${props => props.opacity};
  background-color: green;
`

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ModalProvider backgroundComponent={SpecialModalBackground}>
        <FancyModalButton />
      </ModalProvider>
    </ThemeProvider>
  )
}
```

### `Modal.styled(styles)`

Factory method that accepts a tagged template literal and returns a `<Modal>` component with styles included.

**Arguments**

 - `styles` \(Tagged Template Literal\): styled-components compatible css styles.

*Example:*

```js
const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.white};
`
```

### `<Modal>`

Renders its children in a modal when open, nothing when not open.

**Props**

- `isOpen` \(Boolean\): A boolean that indicates whether the modal is to be open or closed.
- [`onBackgroundClick`] \(Function\): A function that is called when the modal background is clicked.
- [`onEscapeKeydown`] \(Function\): A function that is called when the escape key is pressed while the modal is open.
- [`backgroundProps`] \(Object\): A props object that is spread over the `backgroundComponent` when included.
- [`allowScroll`] \(Boolean\): When true, scrolling in the document body is not disabled when the modal is open.
- [`beforeOpen`] \(Function\): A function that is called before the modal opens. If this function returns a promise, then the modal is opened after the promise is resolved.
- [`afterOpen`] \(Function\): A function that is called after the modal opens.
- [`beforeClose`] \(Function\): A function that is called before the modal closes. If this function returns a promise, then the modal is closed after the promise is resolved.
- [`afterClose`] \(Function\): A function that is called after the modal closes.


*Example:*

```js
import Modal from 'styled-react-modal'

function FancyModalButton() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleModal(e) {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <button onClick={toggleModal}>Click me</button>
      <Modal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}>
        <span>I am a modal!</span>
        <button onClick={toggleModal}>Close me</button>
      </Modal>
    </div>
  )
}
```

### `<BaseModalBackground>`

A convenience base component for making default background styles with `<ModalProvider>`.

*Example:*

```js
const SpecialModalBackground = styled(BaseModalBackground)`
  background-color: green;
`
```
