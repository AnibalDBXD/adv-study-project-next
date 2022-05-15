import { Container } from '@nextui-org/react'
import { AppProps } from 'next/app'
import AppContext from '../src/AppContext'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
<AppContext>
  <Container css={{ padding: '$10', width: '100vw', height: '100vh' }}>
    <Component {...pageProps} />
  </Container>
</AppContext>
)

export default MyApp
