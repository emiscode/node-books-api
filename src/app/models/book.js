import { mongoose } from '../../database/config.js'

const BookSchema = new mongoose.Schema({
  author: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  cover: {
    type: String,
  },
  language: {
    type: String,
  },
  publishedDate: {
    type: Number,
    require: true,
  },
  publisher: {
    type: String,
    require: true,
  },
  ISBN_10: {
    type: String,
    require: true,
  },
  ISBN_13: {
    type: String,
    require: true,
  },
  pages: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Book = mongoose.model('Book', BookSchema)

export { Book }
