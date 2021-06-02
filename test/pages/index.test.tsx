import React from 'react'
import { render } from '../testUtils'
import Home from '../../pages/index'
import { products } from '@/data/products'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('Home page', () => {
  it('matches snapshot', () => {
    useRouter.mockImplementation(() => ({
      locale: 'en',
      locales: ['en', 'fr'],
    }))

    const { asFragment } = render(<Home products={products} />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
