import React, { Component } from 'react'
import { BaseModalBackground } from './baseStyles'
import { Provider } from './context'

export default class ModalProvider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalNode: null,
      BackgroundComponent: BaseModalBackground
    }

    this.setModalNode = this.setModalNode.bind(this)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.backgroundComponent !== prevState.BackgroundComponent &&
        nextProps.backgroundComponent) {
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
