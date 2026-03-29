const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// import routes
const authRoutes = require('./routes/authRoutes')
app.use('/api', authRoutes)

app.get('/', (req, res) => {
  res.send('Hello from Express')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})