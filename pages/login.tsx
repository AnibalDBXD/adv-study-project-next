import { Button, Container, Input, Spacer } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import type { NextPage } from 'next'
import { User } from '../src/types'
import { useUserContext } from '../src/UserContext'

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<User>()
  const { login } = useUserContext()

  return (
    <Container css={{ height: '100%' }} display='flex' justify='center' alignItems='center'>
      <Container as='form' onSubmit={handleSubmit(login)} css={{ width: 'fit-content' }}>
        <Input labelPlaceholder="User name" {...register('name', { required: true })} />
        <Spacer y={1.6} />
        <Input.Password labelPlaceholder="Password" {...register('password', { required: true })} />
        <Spacer y={1.6} />
        <Button type='submit'>Login</Button>
      </Container>
    </Container>
  )
}

export default Login
