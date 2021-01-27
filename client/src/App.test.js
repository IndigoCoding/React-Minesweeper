import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  const { getAllByText } = render(<App />)
  const linkElement = getAllByText(/Position/i)
  console.log(linkElement)
})
