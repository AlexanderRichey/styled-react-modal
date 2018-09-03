import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Modal from '../src/index'

/* global jest, describe, it, expect */

jest.mock('react-dom')

describe('<Modal />', () => {
  ReactDOM.createPortal.mockImplementation(node => node)

  const Content = () => <span>content</span>

  it('calls beforeOpen before it opens', () => {
    const mockCb = jest.fn()
    const mockNoCallCb = jest.fn()
    const wrapper = shallow(
      <Modal
        beforeOpen={mockCb}
        beforeClose={mockNoCallCb}>
        <Content />
      </Modal>
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
        afterClose={mockNoCallCb}>
        <Content />
      </Modal>
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
        beforeClose={mockCb}>
        <Content />
      </Modal>
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
        afterClose={mockCb}>
        <Content />
      </Modal>
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
