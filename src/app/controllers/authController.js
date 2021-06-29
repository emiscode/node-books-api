import express from 'express'
import { User } from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { md5 } from '../../config/auth.js'
import crypto from 'crypto'
import { transport } from '../../modules/mailer.js'

const authRouter = express.Router()

function generateToken(params = {}) {
  return jwt.sign({ id: params.id }, md5, {
    expiresIn: 86400,
  })
}

authRouter.post('/register', async (req, res) => {
  const { email } = req.body

  try {
    if (await User.findOne({ email }))
      return res
        .status(400)
        .send({ error: `User with email ${email} already exists` })

    const user = await User.create(req.body)
    user.password = undefined

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    })
  } catch (err) {
    return res.status(400).send({ error: 'User registration failed' })
  }
})

authRouter.post('/authenticate', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')

  if (!user) return res.status(400).send({ error: 'User not found' })

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: 'Invalid  password' })

  user.password = undefined

  res.send({
    user,
    token: generateToken({ id: user.id }),
  })
})

authRouter.post('/forgot_password', async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) return res.status(400).send({ error: 'User not found' })

    const token = crypto.randomBytes(20).toString('hex')
    const expireDate = new Date()
    expireDate.setHours(expireDate.getHours() + 1)

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: expireDate,
      },
    })
    transport.sendMail(
      {
        to: email,
        from: 'emiscode@gmail.com',
        template: 'auth/forgot_password',
        context: { token },
      },
      err => {
        if (err) return res.status(400).send({ error: 'Cannot reset password' })

        return res.status(200).send()
      }
    )
  } catch (err) {
    res
      .status(400)
      .send({ error: 'There was an error on the forgot password request' })
  }
})

authRouter.post('/reset_password', async (req, res) => {
  const { email, token, newPassword } = req.body

  try {
    const user = await User.findOne({ email }).select(
      '+passwordResetToken passwordResetExpires email'
    )

    if (!user) return res.status(400).send({ error: 'User not found' })

    if (token !== user.passwordResetToken)
      return res.status(400).send({ error: 'Invalid token' })

    const now = new Date()

    if (now > user.passwordResetExpires)
      return res.status(400).send({ error: 'The token has expired' })

    user.password = newPassword
    await user.save()

    res.send({
      msg: 'Password changed with success',
      token: generateToken({ id: user.id }),
    })
  } catch (err) {
    res
      .status(400)
      .send({ error: 'There was an error while reseting the password' })
  }
})

export { authRouter }
