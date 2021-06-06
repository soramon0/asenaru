import { axe } from 'jest-axe'
import user from '@testing-library/user-event'
import { render, screen } from '@testUtils'
import Cookies from 'js-cookie'

import LanguageSelector from '@/components/shared/LanguageSelector'

describe('LanguageSelector component', () => {
  it('is accessible', async () => {
    const { container } = render(<LanguageSelector />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()

    const selector = screen.getByLabelText(/change website language/i)
    const img = selector.querySelector('img')
    expect(selector).toBeInTheDocument()
    expect(img).toBeInTheDocument()
    expect(img?.alt).toBe('en')
  })

  it('displays right locales in English', () => {
    render(<LanguageSelector />)

    openDropDown()
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(2)

    const locales = options.map((el) => ({
      value: el.dataset.value || '',
      label: el.textContent || '',
    }))
    expect(locales).toEqual([
      { value: 'en', label: 'English' },
      { value: 'fr', label: 'French' },
    ])
  })

  it('displays right locales in French', () => {
    render(<LanguageSelector />, { wrapperProps: { locale: 'fr' } })

    openDropDown()
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(2)

    const locales = options.map((el) => ({
      value: el.dataset.value || '',
      label: el.textContent || '',
    }))
    expect(locales).toEqual([
      { value: 'en', label: 'Anglais' },
      { value: 'fr', label: 'Français' },
    ])
  })

  it('does not reload the page if same locale is selected', () => {
    render(<LanguageSelector />)

    openDropDown()
    const options = screen.getAllByRole('option')
    expect(options[0]).toBeInTheDocument()
    user.click(options[0])
    expect(options[0]).not.toBeInTheDocument()
    expect(window.location.assign).not.toHaveBeenCalled()
  })

  it('reloads the page if another language is selected', () => {
    const { unmount } = render(<LanguageSelector />)

    openDropDown()
    const options = screen.getAllByRole('option')
    user.click(options[1])
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(mockCookie).toHaveBeenCalledTimes(1)
    expect(mockCookie).toHaveBeenCalledWith('NEXT_LOCALE', 'fr')
    expect(window.location.assign).toHaveBeenCalledTimes(1)
    expect(window.location.assign).toHaveBeenCalledWith('/')

    unmount()

    // TODO(sora.mon0): find a better way to test language change
    const cookie = Cookies.get('NEXT_LOCALE')
    const locale = cookie === 'fr' ? 'fr' : 'en'
    render(<LanguageSelector />, { wrapperProps: { locale } })

    openDropDown()
    const selector = screen.getByLabelText(/changer la langue du site web/i)
    const img = selector.querySelector('img')
    expect(selector).toBeInTheDocument()
    expect(img).toBeInTheDocument()
    expect(img?.alt).toBe('fr')
  })
})

const mockCookie = jest.spyOn(require('js-cookie'), 'set')

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { assign: jest.fn() },
  })
})

afterAll(() => {
  jest.resetAllMocks()
})

function openDropDown() {
  const selector = screen.getByTestId('selector')
  user.click(selector)
  return { selector }
}
