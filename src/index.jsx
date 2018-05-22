import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { BaseModalBackground } from './baseStyles'

const { Provider, Consumer } = React.createContext(null)

class ModalProvider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalNode: null,
      BackgroundComponent: BaseModalBackground
    }

    this.setModalNode = this.setModalNode.bind(this)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.backgroundComponent !== prevState.BackgroundComponent) {
      return { BackgroundComponent: nextProps.backgroundComponent }
    }

    return null
  }

  setModalNode (node) {
    this.setState({ modalNode: node })
  }

  render () {
    return (
      <Provider value={{
        modalNode: this.state.modalNode,
        BackgroundComponent: this.state.BackgroundComponent
      }}>
        {this.props.children}
        <div ref={this.setModalNode} />
      </Provider>
    )
  }
}

class Modal extends Component {
  constructor (props) {
    super(props)

    this.state = { isOpen: false }

    this.node = null
    this.prevBodyOverflow = null

    this.onKeydown = this.onKeydown.bind(this)
    this.onBackgroundClick = this.onBackgroundClick.bind(this)
    this.cleanUp = this.cleanUp.bind(this)
  }

  static styled (...args) {
    const styles = styled.div`${css(...args)}` || styled.div``
    return class __StyledModal extends Component {
      render () {
        return <Modal WrapperComponent={styles} {...this.props} />
      }
    }
  }

  static getDerivedStateFromProps (nextProps) {
    if (!nextProps.isOpen) {
      return { isOpen: false }
    } else if (nextProps.isOpen) {
      return { isOpen: true }
    }

    return null
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.isOpen !== this.state.isOpen) {
      if (!this.state.isOpen) {
        this.cleanUp()
      } else if (this.state.isOpen) {
        document.addEventListener('keydown', this.onKeydown)

        if (!this.props.allowScroll) {
          this.prevBodyOverflow = document.body.style.overflow
          document.body.style.overflow = 'hidden'
        }
      }
    }
  }

  componentWillUnmount () {
    if (this.state.isOpen) this.cleanUp()
  }

  cleanUp () {
    document.removeEventListener('keydown', this.onKeydown)

    if (!this.props.allowScroll) {
      document.body.style.overflow = this.prevBodyOverflow || ''
    }
  }

  onKeydown (e) {
    if (e.key === 'Escape') {
      this.props.onEscapeKeydown && this.props.onEscapeKeydown(e)
    }
  }

  onBackgroundClick (e) {
    if (this.node === e.target) {
      this.props.onBackgroundClick && this.props.onBackgroundClick(e)
    }
  }

  render () {
    const { isOpen, WrapperComponent, children, ...rest } = this.props

    return (
      <Consumer>
        {({ modalNode, BackgroundComponent }) => {
          if (modalNode && BackgroundComponent && isOpen) {
            return ReactDOM.createPortal((
              <BackgroundComponent
                onClick={this.onBackgroundClick}
                innerRef={node => { this.node = node }}>
                <WrapperComponent {...rest}>
                  {children}
                </WrapperComponent>
              </BackgroundComponent>
            ), modalNode)
          }
        }}
      </Consumer>
    )
  }
}

export default Modal
export { ModalProvider, BaseModalBackground }
