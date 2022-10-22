const express = require('express')
const router = express.Router()

// @desc Login/Landing Page
// @route GET /
router.get('/', (req, res) => {
  res.render('login', {  //it's gonna look for templates/views called login
    layout: 'login',
  })
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard') //it's gonna look for templates/views called dashboard
})


module.exports = router
