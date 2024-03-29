require('dotenv').config()
const express = require('express')
const config = require('./config/db')
const path = require('path')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const nocache = require('nocache')
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'));
app.use(nocache())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(session({
    secret: 'uhdsguakgdfjsafd',
    resave: false,
    saveUninitialized: true,
}))
app.use(methodOverride('_method'))
app.use(flash())

config.dbConnect()

app.use('/', require('./routes/userRoutes'))
// app.use('/admin', require('./routes/adminRoutes'))


const PORT = process.env.PORT 

app.listen(PORT, () => console.log('Server running...')) 