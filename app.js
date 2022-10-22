const path = require('path')
const express = require('express')  //set up express server
const dotenv = require('dotenv') //will have our config variables
const morgan = require('morgan') // when there is a request, it shows down in the console
const exphbs = require('express-handlebars') // handlebars for template engines
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')

//Load config
dotenv.config({ path: './config/config.env'})

//Paasport config
require('./config/passport')(passport)

connectDB()

const app = express()

//Loggin -> console.log data from the request; only runs morgan if in development mode
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

//Sessions middleware -> it has to be abose passport middleware
app.use(session({
  secret: 'keybord cat',
  resave: false,
  saveUninitialized: false,
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `))
