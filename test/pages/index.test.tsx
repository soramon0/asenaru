import React from 'react'
import { render } from '../testUtils'
import Home from '../../pages/index'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('Home page', () => {
  it('matches snapshot', () => {
    useRouter.mockImplementation(() => ({
      locale: 'en',
      locales: ['en', 'fr'],
    }))

    const { asFragment } = render(<Home />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
