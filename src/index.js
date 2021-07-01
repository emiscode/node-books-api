import cors from 'cors'
import express from 'express'
import { authRouter } from './app/controllers/authController.js'
import { bookRouter } from './app/controllers/bookController.js'
import { borrowRouter } from './app/controllers/borrowController.js'
import { projectRouter } from './app/controllers/projectController.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: '*',
  })
)
app.use('/auth', authRouter)
app.use('/project', projectRouter)
app.use('/books', bookRouter)
app.use('/borrow', borrowRouter)

app.listen(3000)

// kyc8FoJV7xvC8c2v
// node-api-books@challenge.2021
// 7ce527c157f6802d948629935b1bb514
