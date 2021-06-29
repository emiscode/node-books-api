import express from 'express'
import { mainRouter } from './app/controllers/mainController.js'
import { authRouter } from './app/controllers/authController.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/service', mainRouter)
app.use('/auth', authRouter)

app.listen(3000)

// kyc8FoJV7xvC8c2v
// node-api-books@challenge.2021
// 7ce527c157f6802d948629935b1bb514
