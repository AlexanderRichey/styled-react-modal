import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'
import Modal from '../src/index'

/* global jest, describe, it, expect */

jest.mock('react-dom')

describe('<Modal />', () => {
  ReactDOM.createPortal.mockImplementation(node => node)

  const Background = () => <div />

  it('renders nothing when not open', () => {
    const outer = shallow(<Modal />)
    const ModalChildren = outer.props().children
    const inner = mount(
      <ModalChildren
        modalNode
        BackgroundComponent={Background} />
    )

    expect(inner.html()).toBe(null)
  })

  it('renders children when open', () => {
    const outer = shallow(<Modal />)
    outer.setProps({ isOpen: true })
    const ModalChildren = outer.props().children
    const inner = shallow(
      <ModalChildren
        modalNode
        BackgroundComponent={Background} />
    )

    expect(inner.html()).not.toBe(null)
  })

  it('passes backgroundProps to background', () => {
    const backgroundProps = { opacity: 1 }

    const outer = shallow(<Modal />)
    outer.setProps({ isOpen: true, backgroundProps })
    const ModalChildren = outer.props().children
    const inner = shallow(
      <ModalChildren
        modalNode
        BackgroundComponent={Background} />
    )
    const renderedBackgroundProps = inner.props()

    expect(renderedBackgroundProps).toHaveProperty('opacity', 1)
  })

  it('renders WrapperComponent when included', () => {
    const Wrapper = () => <span />
    const outer = shallow(<Modal WrapperComponent={Wrapper} />)
    outer.setProps({ isOpen: true })
    const ModalChildren = outer.props().children
    const inner = shallow(
      <ModalChildren
        modalNode
        BackgroundComponent={Background} />
    )

    // We just check to see if the type is the same as the Wrapper
    expect(inner.props().children.type().type).toEqual('span')
  })

  it('calls beforeOpen before it opens', () => {
    const mockCb = jest.fn()
    const mockNoCallCb = jest.fn()
    const wrapper = shallow(
      <Modal
        beforeOpen={mockCb}
        beforeClose={mockNoCallCb} />
    )

    wrapper.setProps({ isOpen: true })

    expect(mockCb.mock.calls.length).toBe(1)
    expect(mockNoCallCb.mock.calls.length).toBe(0)
  })

  it('calls afterOpen after it opens', () => {
    const mockCb = jest.fn()
    const mockNoCallCb = jest.fn()
    const wrapper = shallow(
      <Modal
        afterOpen={mockCb}
        afterClose={mockNoCallCb} />
    )

    wrapper.setProps({ isOpen: true })

    expect(mockCb.mock.calls.length).toBe(1)
    expect(mockNoCallCb.mock.calls.length).toBe(0)
  })

  it('calls beforeClose before it closes', () => {
    const openCb = jest.fn()
    const mockCb = jest.fn()
    const wrapper = shallow(
      <Modal
        beforeOpen={openCb}
        afterOpen={openCb}
        beforeClose={mockCb} />
    )

    wrapper.setProps({ isOpen: true })
    wrapper.setProps({ isOpen: false })

    expect(openCb.mock.calls.length).toBe(2)
    expect(mockCb.mock.calls.length).toBe(1)
  })

  it('calls afterClose after it closes', () => {
    const openCb = jest.fn()
    const mockCb = jest.fn()
    const wrapper = shallow(
      <Modal
        beforeOpen={openCb}
        afterOpen={openCb}
        afterClose={mockCb} />
    )

    wrapper.setProps({ isOpen: true })
    wrapper.setProps({ isOpen: false })

    expect(openCb.mock.calls.length).toBe(2)
    expect(mockCb.mock.calls.length).toBe(1)
  })
})

describe('Modal.styled()', () => {
  it('returns to a Modal instance', () => {
    const StyledModal = Modal.styled`
      background-color: green;
    `
    const wrapper = shallow(<StyledModal />)

    expect(wrapper.type()).toBe(Modal)
  })
})
