import { axe } from 'jest-axe'
import user from '@testing-library/user-event'
import { render, screen, pressKey } from '@testUtils'

import Dropdown from '@/components/shared/Dropdown'

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

    const { button, dropdownList } = openDropdown()
    user.click(button)
    expect(dropdownList).not.toBeInTheDocument()
  })

  it('closes dropdown once the close button is clicked', () => {
    render(dropdown)

    expect(screen.queryByTestId('selectorCloser')).not.toBeInTheDocument()
    const { dropdownList } = openDropdown()

    const closeBtn = screen.getByTestId('selectorCloser')
    user.click(closeBtn)
    expect(dropdownList).not.toBeInTheDocument()
    expect(closeBtn).not.toBeInTheDocument()
  })

  it('closes dropdown when clicking outside the dropdown', () => {
    render(dropdown)

    const { dropdownList } = openDropdown()
    user.click(dropdownList)
    expect(dropdownList).toBeInTheDocument()
    user.click(document.body)
    expect(dropdownList).not.toBeInTheDocument()
  })

  it('closes dropdown when escape is pressed', () => {
    render(dropdown)

    const { dropdownList } = openDropdown()
    pressKey('Escape')
    expect(dropdownList).not.toBeInTheDocument()
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('closes dropdown when an item is clicked', () => {
    render(dropdown)

    const { dropdownList } = openDropdown()
    const items = screen.getAllByRole('option')
    user.click(items[0])
    expect(dropdownList).not.toBeInTheDocument()
    isCalledTimesWith(1, 'op1')
  })

  it('moves with down arrow and selects with Enter', () => {
    render(dropdown)

    const { dropdownList } = openDropdown()
    pressKey('ArrowDown', 1)
    selectWith('Enter', dropdownList)
    isCalledTimesWith(1, 'op1')
  })

  it('moves with up arrow and selects with Spacebar', () => {
    render(dropdown)

    const { dropdownList } = openDropdown()
    pressKey('ArrowDown', 2)
    pressKey('ArrowUp', 1)
    selectWith(' ', dropdownList)
    isCalledTimesWith(1, 'op1')
  })

  it('moves a full circle using arrows and selects with Enter/Spacebar', () => {
    render(dropdown)

    const { dropdownList } = openDropdown()
    pressKey('ArrowDown', 3)
    selectWith(' ', dropdownList)
    isCalledTimesWith(1, 'op1')

    openDropdown()
    pressKey('ArrowUp', 3)
    selectWith('Enter', dropdownList)
    isCalledTimesWith(2, 'op2')
  })
})

const onSelect = jest.fn()
const dropdown = (
  <Dropdown
    selectorLabel="Options"
    onSelect={onSelect}
    items={[
      { label: 'Option 1', value: 'op1' },
      { label: 'Option 2', value: 'op2' },
    ]}
  />
)

function openDropdown() {
  const button = screen.getByLabelText(/options/i) as HTMLButtonElement
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  user.click(button)
  expect(screen.getByRole('listbox')).toBeInTheDocument()
  const dropdownList = screen.getByRole('listbox') as HTMLUListElement
  return { button, dropdownList }
}

function selectWith(key: 'Enter' | ' ', el: HTMLElement) {
  pressKey(key)
  expect(el).not.toBeInTheDocument()
}

function isCalledTimesWith(times: number, arg: any) {
  expect(onSelect).toHaveBeenCalledTimes(times)
  expect(onSelect).toHaveBeenCalledWith(arg)
}
