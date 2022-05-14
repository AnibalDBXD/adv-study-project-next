import type { NextApiHandler } from 'next'
import { setCookie } from '../../src/utils'
import users from '../../users.json'

const login: NextApiHandler = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  const { name, password } = JSON.parse(req.body)

  const logedUser = users.find((user) => {
    return name === user.name && password === user.password
  })

  if (logedUser) {
    setCookie(res, 'logedUser', JSON.stringify(logedUser))

    res.statusCode = 200
    res.end(JSON.stringify({
      user: logedUser,
      message: 'Login successful'
    }))

    return
  }

  res.statusCode = 404
  res.end(JSON.stringify({
    message: 'User not found',
    user: null
  }))
}

export default login
