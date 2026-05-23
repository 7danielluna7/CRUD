import express from 'express'
import * as db from './queries.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" })
  })
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})
