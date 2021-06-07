import React from 'react'
import { axe } from 'jest-axe'
import { render } from '@testUtils'
import { ImageProps } from 'next/image'

import { products } from '@/data/products'
import Home from '@/pages/index'

describe('Home page', () => {
  it('is accessible', async () => {
    const { container } = render(<Home products={products} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<Home products={products} />)
    expect(asFragment()).toMatchSnapshot()
  })
})

beforeAll(() => {
  Object.defineProperty(require('next/image'), 'default', {
    writable: true,
    value: (props: ImageProps) => <img {...props} />,
  })

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      observe: () => null,
      disconnect: () => null,
    })),
  })
})

afterAll(() => {
  jest.resetAllMocks()
})
