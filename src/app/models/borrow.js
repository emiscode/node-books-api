import { mongoose } from '../../database/config.js'

const BorrowSchema = new mongoose.Schema({
  requesterUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  providerUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    require: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
    require: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
  returnedDate: {
    type: Date,
    require: true,
    default: undefined,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
  approvedDate: {
    type: Date,
    require: true,
    default: undefined,
  },
})

const Borrow = mongoose.model('Borrow', BorrowSchema)

export { Borrow }
