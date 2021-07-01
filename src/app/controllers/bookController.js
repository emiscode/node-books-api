import express from 'express'
import { authMiddleware } from '../middlewares/auth.js'
import { Book } from '../models/Book.js'

const bookRouter = express.Router()

//bookRouter.use(authMiddleware)

bookRouter.get('/', async (req, res) => {
  try {
    const books = await Book.find()

    return res.send({ books })
  } catch (err) {
    return res.status(400).send({ error: 'Listing books has failed' })
  }
})

bookRouter.get('/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)

    return res.send({ book })
  } catch (err) {
    return res.status(400).send({ error: 'Loading the book has failed' })
  }
})

bookRouter.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body)

    return res.send({ book })
  } catch (err) {
    return res.status(400).send({ error: 'Book creation has failed' })
  }
})

bookRouter.put('/:bookId', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    })

    return res.send({ book })
  } catch (err) {
    return res.status(400).send({ error: 'Book update has failed' })
  }
})

bookRouter.delete('/:bookId', async (req, res) => {
  try {
    await Book.findByIdAndRemove(req.params.bookId)

    return res.send()
  } catch (err) {
    return res.status(400).send({ error: 'Deleting book has failed' })
  }
})

export { bookRouter }
