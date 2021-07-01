import jwt, { decode } from 'jsonwebtoken'
import { md5 } from '../../config/auth.js'

const authMiddleware = function (req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).send({ error: 'No token has been provided' })

  const parts = authHeader.split(' ')

  if (!parts.length === 2)
    return res.status(401).send({ error: 'There is an error with the token' })

  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Malformed token' })

  jwt.verify(token, md5, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Invalid token' })

    req.userId = decoded.id
  })

  return next()
}

export { authMiddleware }
