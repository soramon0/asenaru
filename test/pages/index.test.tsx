import React from 'react'
import { render } from '../testUtils'
import Home from '../../pages/index'
import { products } from '@/data/products'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home products={products} />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
