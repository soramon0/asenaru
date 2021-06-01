import React from 'react'
import { render, screen, fireEvent } from '../../testUtils'

import DarkModeSwitch from '@/components/shared/DarkModeSwitch'

describe('DarkModeSwitch component', () => {
  it('matches snapshot', async () => {
    render(<DarkModeSwitch />, {})
    const button = await screen.findByTestId('dark-mode-switch')
    fireEvent.click(button)
  })
})
