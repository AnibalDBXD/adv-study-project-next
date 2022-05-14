import { Container, NextUIProvider } from '@nextui-org/react'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserProvider } from '../src/UserContext'
import { fetchApi } from '../src/utils'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey }) => {
        return fetchApi(queryKey[0] as string, queryKey[1] as { [key: string]: string })
      }
    }
  }
})

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <UserProvider>
        <Container css={{ padding: '$10', width: '100vw', height: '100vh' }}>
          <Component {...pageProps} />
        </Container>
      </UserProvider>
    </NextUIProvider>
  </QueryClientProvider>
)

export default MyApp
