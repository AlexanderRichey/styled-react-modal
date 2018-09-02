import React from 'react'
import { mount, ReactWrapper } from 'enzyme'

import Modal, { ModalProvider } from '../src/index'

/* global describe, it, expect, afterEach */

describe('<Modal />', () => {
  let wrapper

  const Content = () => <span>content</span>

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders nothing when not open', () => {
    wrapper = mount(
      <ModalProvider>
        <Modal isOpen={false}>
          <Content />
        </Modal>
      </ModalProvider>
    )

    expect(wrapper.find(Content).exists()).not.toBeTruthy()
  })

  it('renders children when open', () => {
    wrapper = mount(
      <ModalProvider>
        <Modal isOpen={true}>
          <Content />
        </Modal>
      </ModalProvider>
    )

    expect(wrapper.find(Content).exists()).toBeTruthy()
  })
})
