import React from 'react'
import { axe } from 'jest-axe'
import user from '@testing-library/user-event'
import { render, cleanup, screen } from '@testUtils'

import Page from '@/components/layout/Page'
import DarkModeSwitch from '@/components/shared/DarkModeSwitch'

afterEach(cleanup)

describe('DarkModeSwitch component', () => {
  it('is accessible', async () => {
    const { container } = render(<DarkModeSwitch />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('shows the right aria-label text', async () => {
    render(<DarkModeSwitch />)
    const button = await screen.findByTestId('dark-mode-switch')
    const { queryByLabelText } = screen
    const darkLabel = /switch to dark mode/i
    const lightLabel = /switch to light mode/i

    expect(queryByLabelText(darkLabel)).not.toBeNull()
    expect(queryByLabelText(lightLabel)).toBeNull()
    user.click(button)
    expect(queryByLabelText(lightLabel)).not.toBeNull()
    expect(queryByLabelText(darkLabel)).toBeNull()
    user.click(button)
    expect(queryByLabelText(darkLabel)).not.toBeNull()
    expect(queryByLabelText(lightLabel)).toBeNull()
  })

  it('toggles dark mode class', async () => {
    const { container } = render(<Page />, {
      wrapperProps: { resetThemeMode: true },
    })
    const button = await screen.findByTestId('dark-mode-switch')
    const themeContainer = container.querySelector('.light')
    const classes = themeContainer?.classList

    expect(classes?.contains('light')).toBe(true)
    expect(classes?.contains('dark')).toBe(false)
    user.click(button)
    expect(classes?.contains('dark')).toBe(true)
    expect(classes?.contains('light')).toBe(false)
  })
})
