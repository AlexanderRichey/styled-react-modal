import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Modal from '../src/index'

/* global jest, describe, it, expect */

jest.mock('react-dom')

describe('<Modal />', () => {
  ReactDOM.createPortal.mockImplementation(node => node)

  const Content = () => <span>content</span>

  it('renders without crashing', () => {
    const wrapper = shallow(
      <Modal>
        <Content />
      </Modal>
    )

    expect(wrapper)
  })
})
