import React from 'react'
import { mount } from 'enzyme'

import { ModalProvider } from '../src/index'

describe('<ModalProvider />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<ModalProvider />)
    expect(wrapper.html()).toBe('<div></div>')
  })

  it('sets modalNode', () => {
    const wrapper = mount(<ModalProvider />)
    expect(wrapper.state().modalNode).toBeTruthy()
  })

  it('uses backgroundComponent if provided', () => {
    const background = <div />
    const wrapper = mount(<ModalProvider backgroundComponent={background} />)
    expect(wrapper.state().BackgroundComponent).toBe(background)
  })
})
