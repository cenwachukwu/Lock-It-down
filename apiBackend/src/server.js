import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import { signup, signin, protect } from './utils/auth'
import { users } from './resources/user/user.controllers'
import noteRouter from './resources/notes/notes.router'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)
// how do we get all of our users:
// the protect middleware was stoping us from accessing all the users without auth
// will take out later because user info will be made public
app.get('/users', users)

app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/notes', noteRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
