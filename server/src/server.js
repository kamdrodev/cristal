dotenv.config()

import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import mongoose from 'mongoose'
import chalk from 'chalk'

const app = express()
const port = process.env.PORT || 5000

mongoose.connect(process.env.DATABASE_URL)

app.use(cors())

import authRoutes from './routes/auth.js'
import listsRoutes from './routes/lists.js'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())

app.use('/api/auth', authRoutes)
app.use('/api/', listsRoutes)

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  err.message = err.message || 'Error'
  err.status = err.status || 400

  return res.status(err.status).json({
    message: err.message
  })
})

app.listen(port, () => {
  console.log(chalk.yellow(`Server is running on port: ${port}`))
})

export default app
