const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const mongoDbStore = require('connect-mongodb-session')(session)

const path = require('path')
const userRouter = require("./routes/storeRouter")
const {hostRouter} = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil")
const errorController = require("./controllers/error")
const User = require('./models/user')

const app = express()
const PORT = 3000
const DB_PATH = "mongodb+srv://root:root@airbnb.6j5lqiw.mongodb.net/airbnb"

app.set('view engine', 'ejs')
app.set('views', 'views')

const store = new mongoDbStore({
    uri: DB_PATH,
    collection: 'sessions'
})

store.on('error', err => console.log('Store error:', err))
store.on('connected', () => console.log('Store connected!'))

app.use(express.static(path.join(rootDir, "public")))

app.use(session({
    secret: 'secret1307',
    resave: true,
    saveUninitialized: false,
    
    store: store
}))

app.use((req, res, next) => {
    console.log('Session ID (connect.sid):', req.sessionID)
    console.log('Session:', req.session)
    console.log('userId:', req.session.userId)
    
    if(!req.session.userId) {
        req.isLoggedIn = false
        res.locals.isLoggedIn = false
        res.locals.user = null
        return next()
    }
    User.findById(req.session.userId).lean()
        .then(user => {
            console.log('Found user:', user)
            req.isLoggedIn = true
            req.user = user
            res.locals.isLoggedIn = true
            res.locals.user = user
            next()
        })
        .catch(err => {
            console.log('User find error:', err)
            next()
        })
})

app.use((req, res, next) => {
    console.log(req.url, req.method)
    next()
})

app.use(express.urlencoded({ extended: false }))
app.use(authRouter)

app.use('/host/', (req, res, next) => {
    if(req.isLoggedIn) next()
    else res.redirect('/login')
})

app.use(userRouter)
app.use("/host", hostRouter)
app.use(errorController.default)

mongoose.connect(DB_PATH).then(() => {
    console.log('MongoDB connected!')
    app.listen(PORT, () => {
        console.log(`Server on http://localhost:${PORT}/`)
    })
}).catch(err => console.log("Error:", err))