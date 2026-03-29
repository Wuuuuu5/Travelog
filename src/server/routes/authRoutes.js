const express = require('express')
const router = express.Router()

// POST /api/signup
router.post('/signup', (req, res) => {
  const { username, email, password } = req.body
  console.log('Signup data:', username, email, password)

  // For now, just send a response
  res.json({ message: 'User registered (test only)' })
})

module.exports = router