import { Container, NextUIProvider } from '@nextui-org/react'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { fetchApi } from '../utils'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey }) => fetchApi(queryKey[0] as string, queryKey[1] as { [key: string]: string })
    }
  }
})

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <Container css={{ padding: '$10', width: '100vw', height: '100vh' }}>
        <Component {...pageProps} />
      </Container>
    </NextUIProvider>
  </QueryClientProvider>
)

export default MyApp
