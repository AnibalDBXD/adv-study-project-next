import { Container, Text, Image, Button } from '@nextui-org/react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { fetchApi } from '../src/utils'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetchApi(`/gifs/${context.query.id}`)
  return {
    props: {
      data: data.data
    }
  }
}

const GiftPage: NextPage<{ data: any }> = ({ data }) => {
  const { push } = useRouter()
  if (!data.length) return <Text h1>No found</Text>
  return (
    <Container>
        <Button onClick={() => push('/')} color="primary" >Go back</Button>
        <Text h1>{data.title}</Text>
        <Text weight="bold">Rating: {data.rating}</Text>
          <Text weight="bold">Date time: {data.import_datetime}</Text>
          <Container justify='center' display="flex" css={{ marginTop: '$10' }}>
          <Image
            css={{
              width: `${data.images?.downsized_large?.width || 0}px`,
              height: `${data.images?.downsized_large?.height || 0}px`
            }}
            showSkeleton
            width={data.images?.downsized_large?.width || 0}
            height={data.images?.downsized_large?.height || 0}
            alt={data.title}
            src={data.images?.downsized_large?.url || 0}
            />
            </Container>
    </Container>
  )
}

export default GiftPage
