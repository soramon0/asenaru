import React from 'react'
import { render, fireEvent } from '../../testUtils'

import DarkModeSwitch from '@/components/shared/DarkModeSwitch'

describe('DarkModeSwitch component', () => {
  it('matches snapshot', () => {
    const { container } = render(<DarkModeSwitch />, {})
    fireEvent.click(container)
  })
})
