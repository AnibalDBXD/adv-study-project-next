import { Container, Text, Image, Button } from '@nextui-org/react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { fetchApi } from '../utils'

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
  return (
    <Container>
        <Button onClick={() => push('/')} color="primary" >Go back</Button>
        <Text h1>{data.title}</Text>
        <Text weight="bold">Rating: {data.rating}</Text>
          <Text weight="bold">Date time: {data.import_datetime}</Text>
          <Container justify='center' display="flex" css={{ marginTop: '$10' }}>
          <Image
            css={{
              width: `${data.images.downsized_large.width}px`,
              height: `${data.images.downsized_large.height}px`
            }}
            showSkeleton
            width={data.images.downsized_large.width}
            height={data.images.downsized_large.height}
            alt={data.title}
            src={data.images.downsized_large.url}
            />
            </Container>
    </Container>
  )
}

export default GiftPage
