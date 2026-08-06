const express = require('express')
const authRouter = require('./routes/auth.route')
const cookieParser = require('cookie-parser') 
const app = express()
const cors = require("cors")
const interviewRouter = require('./routes/interview.route')
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "https://ai-job-preperation-plan.vercel.app",
    credentials: true
}))


app.use('/api/auth', authRouter)
app.use('/api/interview',interviewRouter)

module.exports = app
