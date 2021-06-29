import path from 'path'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import { mailConfig } from '../config/mail.js'

const transport = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass,
  },
})

transport.use(
  'compile',
  hbs({
    viewEngine: {
      extname: '.html',
      defaultLayout: '',
    },
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html',
  })
)

export { transport }
