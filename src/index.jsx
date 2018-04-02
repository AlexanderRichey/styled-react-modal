import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { BaseModalBackground } from './baseStyles'

let modalNode = null
let BackgroundComponent = BaseModalBackground

class ModalProvider extends Component {
  componentDidMount () {
    if (this.props.backgroundComponent) {
      BackgroundComponent = this.props.backgroundComponent
    }
  }

  render () {
    return (
      <React.Fragment>
        {this.props.children}
        <div ref={node => { modalNode = node }} />
      </React.Fragment>
    )
  }
}

class Modal extends Component {
  constructor (props) {
    super(props)

    this.state = { isOpen: false }

    this.node = null
    this.InnerStyles = styled.div`${props.styles}` || styled.div``

    this.onKeydown = this.onKeydown.bind(this)
    this.onBackgroundClick = this.onBackgroundClick.bind(this)
  }

  static styled (...args) {
    const styles = css(...args)
    return class __StyledModal extends Component {
      render () {
        return <Modal styles={styles} {...this.props} />
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
        modalNode && this.node && modalNode.removeChild(this.node)
        document.removeEventListener('keydown', this.onKeydown)
      } else if (this.state.isOpen) {
        document.addEventListener('keydown', this.onKeydown)
      }
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
    if (this.props.isOpen) {
      return ReactDOM.createPortal((
        <BackgroundComponent
          onClick={this.onBackgroundClick}
          innerRef={node => { this.node = node }}>
          <this.InnerStyles>
            {this.props.children}
          </this.InnerStyles>
        </BackgroundComponent>
      ), modalNode)
    } else {
      return null
    }
  }
}

export default Modal
export { ModalProvider, BaseModalBackground }
