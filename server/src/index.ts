import express from 'express'
import cors from 'cors'
import { errors } from 'celebrate'

import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errors())

const PORT = process.env.PORT ?? 4000

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
