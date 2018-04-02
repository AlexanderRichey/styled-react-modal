# Styled React Modal

[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![npm version](https://img.shields.io/npm/v/styled-react-modal.svg)](https://img.shields.io/npm/v/standard.svg) [![npm downloads](https://img.shields.io/npm/dm/styled-react-modal.svg)](https://www.npmjs.com/package/styled-react-modal)

Styled React Modal is a modal implementation built with styled-components. It uses the latest React 16.x features and exposes a familiar, easy to use API.

## Install

```
npm i -s styled-react-modal
```

## Usage

Add the `<ModalProvider>` component near the top of your application's tree.

```jsx
import React, { Component } from 'react'
import { ModalProvider } from 'styled-react-modal'
...

export default class App extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <FancyModalButton />
        </ModalProvider>
      </ThemeProvider>
    )
  }
}
```

Use the `<Modal>` component.

```jsx
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

class FancyModalButton extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false,
    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal (e) {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    return (
      <div>
        <button onClick={this.toggleModal}>Click me</button>
        <StyledModal
          isOpen={this.state.isOpen}
          onBackgroundClick={this.toggleModal}
          onEscapeKeydown={this.toggleModal}>
          <span>I am a modal!</span>
          <button onClick={this.toggleModal}>Close me</button>
        </StyledModal>
      </div>
    )
  }
}

```

## API

#### Top-Level Exports
- `<ModalProvider>`
- `Modal` (Default)
  - `Modal.styled(styles)`
  - `<Modal>`
- `<BaseModalBackground>`

### `<ModalProvider>`

Sets the root portal where `<Modal>`s will be rendered.

**Props**

- [`backgroundComponent`] (Component): A styled component to be used as the default modal background.

*Example:*

```
import { ModalProvider } from 'styled-react-modal'

const SpecialModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  background-color: green;
`

export default class App extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <ModalProvider backgroundComponent={SpecialModalBackground}>
          <FancyModalButton />
        </ModalProvider>
      </ThemeProvider>
    )
  }
}
```

### `Modal.styled(styles)`

Factory method that accepts a tagged template literal and returns a `<Modal>` component with styles included.

**Arguments**

 - `styles` (Tagged Template Literal): styled-components compatible css styles.

*Example:*

```
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

- `isOpen` (Boolean): A boolean that indicates whether the modal is to be open or closed.
- [`onBackgroundClick`] (Function): A function that is called when the modal background is clicked.
- [`onEscapeKeydown`] (Function): A function that is called when the escape key is pressed while the modal is open.

*Example:*

```
import Modal from 'styled-react-modal'

class FancyModalButton extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: false,
    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal (e) {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    return (
      <div>
        <button onClick={this.toggleModal}>Click me</button>
        <Modal isOpen={this.state.isOpen}>
          <span>I am a modal!</span>
          <button onClick={this.toggleModal}>Close me</button>
        </Modal>
      </div>
    )
  }
}
```

### `<BaseModalBackground>`

A convenience base component for making default background styles with `<ModalProvider>`.

*Example:*

```
const SpecialModalBackground = styled(BaseModalBackground)`
  background-color: green;
`
```
