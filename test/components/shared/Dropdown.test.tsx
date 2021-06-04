import { axe } from 'jest-axe'
import user from '@testing-library/user-event'
import { render, screen, fireEvent } from '@testUtils'

import Dropdown from '@/components/shared/Dropdown'

const onSelect = jest.fn()
const dropdown = (
  <Dropdown
    selectorLabel="Options"
    onSelect={onSelect}
    items={[
      { label: 'Option 1', value: 'op1' },
      { label: 'Option 2', value: 'op1' },
    ]}
  />
)

afterEach(() => {
  onSelect.mockReset()
})

describe('Dropdown component', () => {
  it('is accessible', async () => {
    const { container } = render(dropdown)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('toggles dropdown', () => {
    render(dropdown)

    const button = screen.getByLabelText(/options/i)
    user.click(document.body)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    user.click(button)
    expect(screen.queryByRole('listbox')).toBeInTheDocument()
    user.click(button)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('closes dropdown once the close button is clicked', () => {
    render(dropdown)

    const button = screen.getByLabelText(/options/i)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.queryByTestId('selectorCloser')).not.toBeInTheDocument()
    user.click(button)
    expect(screen.queryByRole('listbox')).toBeInTheDocument()

    const closeBtn = screen.getByTestId('selectorCloser')
    user.click(closeBtn)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.queryByTestId('selectorCloser')).not.toBeInTheDocument()
  })

  it('closes dropdown when clicking outside the dropdown', () => {
    render(dropdown)

    const button = screen.getByLabelText(/options/i)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    user.click(button)

    const dropdownList = screen.getByRole('listbox')
    expect(dropdownList).toBeInTheDocument()
    user.click(dropdownList)
    expect(dropdownList).toBeInTheDocument()
    user.click(document.body)
    expect(dropdownList).not.toBeInTheDocument()
  })

  it('closes dropdown when escape is pressed', () => {
    render(dropdown)

    const button = screen.getByLabelText(/options/i)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    user.click(button)
    expect(screen.queryByRole('listbox')).toBeInTheDocument()
    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' })
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('closes dropdown when an item is clicked', () => {
    render(dropdown)

    const button = screen.getByLabelText(/options/i)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    user.click(button)
    expect(screen.queryByRole('listbox')).toBeInTheDocument()

    const items = screen.getAllByRole('option')
    user.click(items[0])
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith('op1')
  })
})
