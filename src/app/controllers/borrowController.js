import express from 'express'
import { authMiddleware } from '../middlewares/auth.js'
import { Borrow } from '../models/borrow.js'

const borrowRouter = express.Router()

borrowRouter.use(authMiddleware)

borrowRouter.get('/requester/:requesterUser', async (req, res) => {
  try {
    const borrow = await Borrow.find({
      requesterUser: req.params.requesterUser,
    }).populate(['requesterUser', 'providerUser'])

    return res.send({ borrow })
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Loading the borrow book record has failed' })
  }
})

borrowRouter.get('/provider/:providerUser', async (req, res) => {
  try {
    const borrow = await Borrow.find({
      providerUser: req.params.providerUser,
    }).populate(['requesterUser', 'providerUser'])

    return res.send({ borrow })
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Loading the borrow book record has failed' })
  }
})

borrowRouter.post('/', async (req, res) => {
  try {
    const borrow = await Borrow.create(req.body)

    return res.send({ borrow })
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Creating borrow book record has failed' })
  }
})

borrowRouter.put('/:borrowId', async (req, res) => {
  try {
    const borrow = await Borrow.findByIdAndUpdate(
      req.params.borrowId,
      req.body,
      {
        new: true,
      }
    )

    return res.send({ borrow })
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Updating borrow book record has failed' })
  }
})

borrowRouter.delete('/:borrowId', async (req, res) => {
  try {
    await Borrow.findByIdAndRemove(req.params.borrowId)

    return res.send()
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Deleting borrow book record has failed' })
  }
})

export { borrowRouter }
