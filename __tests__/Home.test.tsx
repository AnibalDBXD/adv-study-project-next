import { expect, test, describe, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../pages/index'
import { queryClient } from '../src/AppContext'
import { QueryClientProvider } from 'react-query'
import { UserProvider } from '../src/UserContext'

vi.mock('next/router', () => ({
  useRouter () {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: vi.fn()
    }
  }
}))

describe('Home', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <UserProvider defaultUser={{
        name: 'John Doe',
        password: '123456'
      }}>
        <Home />
      </UserProvider>
    </QueryClientProvider>
  )
  test('Render', () => {
    const input = screen.getByPlaceholderText('Search a gif')
    expect(input).toBeDefined()
  })
  test('Have loader', async () => {
    const loader = screen.getByLabelText('Loading')
    expect(loader).toBeDefined()
  })
  test('Write on input', () => {
    const input: HTMLInputElement = screen.getByPlaceholderText('Search a gif')
    fireEvent.change(input, { target: { value: 'Dogs' } })

    expect(input.value).toBe('Dogs')
  })
})
