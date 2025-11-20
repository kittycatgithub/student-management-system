// Server.js is main file (Entry Point) of Backend Server

import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/db.js'
import 'dotenv/config'
import userRouter from './routes/userRoute.js'

const app = express() //created app using Express Package
const port = process.env.PORT || 4000

await connectDB()

// Allow multiple origins
const allowedOrigins = ['http://localhost:5173','http://localhost:4000' ]

// Middleware configuration
app.use(express.json()) // all requests coming to server, will be parsed into JSON format using json method
app.use( cookieParser() )
app.use( cors( {origin: allowedOrigins, credentials: true} ) )

app.get('/', ( req, res )=> res.send("API is Working") )        // Creating Route
app.use('/api/user', userRouter)

app.listen(port, ()=> {
    console.log(`Server is Running on http://localhost:${port}`)
})







