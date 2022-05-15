import { NextUIProvider } from '@nextui-org/react'
import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserProvider } from './UserContext'
import { fetchApi } from './utils'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey }) => {
        return fetchApi(queryKey[0] as string, queryKey[1] as { [key: string]: string })
      }
    }
  }
})

const AppContext: React.FC<{ children: ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        <NextUIProvider>
            <UserProvider>
                {children}
            </UserProvider>
        </NextUIProvider>
    </QueryClientProvider>
)

export default AppContext
