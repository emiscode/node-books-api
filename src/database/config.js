import mongoose from 'mongoose'

const uri =
  'mongodb+srv://emiscode:kyc8FoJV7xvC8c2v@emiscode-cluster.gritk.mongodb.net/node-api-books?retryWrites=true&w=majority'

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.Promise = global.Promise

export { mongoose }
