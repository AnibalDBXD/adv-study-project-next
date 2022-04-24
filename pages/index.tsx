/* eslint-disable camelcase */
import { Container, Input, Image, Grid, Loading, Text } from '@nextui-org/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const Home: NextPage = () => {
  const { push, query } = useRouter()
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery<any>(['/gifs/search', { q: query.q || 'Cats', limit: 10 }])

  useEffect(
    () => {
      const handler = setTimeout(() => {
        push(`/?q=${search}`, undefined, { shallow: true })
      }, 300)

      return (): void => {
        clearTimeout(handler)
      }
    },
    [push, search]
  )

  return (
    <Container display='flex' justify='center'>
      <Input
        width='60%'
        value={search}
        onChange={({ target: { value } }) => setSearch(value)}
        bordered
        initialValue='Cats'
        placeholder='Search a gif'
        label='Search a gif'
        clearable
      />
      <Grid.Container gap={2} justify="center" css={{ paddingTop: '$20', maxWidth: '600px' }}>
        {isLoading && (
          <Loading size="md" />
        )}
        {data?.data?.length
          ? (
              data?.data.map(({ id, title, images: { preview_gif } }: any) => (
              <Grid key={id} xs={4}>
                <NextLink href={`/${id}`}>
                  <a style={{
                    width: preview_gif.width,
                    height: preview_gif.height
                  }}>
                    <Image
                      showSkeleton
                      width={preview_gif.width}
                      height={preview_gif.height}
                      src={preview_gif.url}
                      alt={title}
                    />
                  </a>
                </NextLink>
              </Grid>
              ))
            )
          : (
            <>{!Loading && <Text>No results...</Text>}</>
            )}
      </Grid.Container>
    </Container>
  )
}

export default Home
