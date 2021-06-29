import express from 'express'
import { authMiddleware } from '../middlewares/auth.js'

const mainRouter = express.Router()

mainRouter.use(authMiddleware)

mainRouter.get('/', (req, res) => {
  res.send({ ok: true, user: req.userId })
})

export { mainRouter }
