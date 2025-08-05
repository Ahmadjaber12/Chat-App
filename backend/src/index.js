import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import { connection } from './lib/db.js'
import { errorHandler, notFound } from './middlewares/errorHandling.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import messageRoute from './routes/messages.route.js'
import { app, server } from './lib/socket.js'
dotenv.config()
connection();
const port = process.env.PORT
app.use(express.json());
app.use(cors(
   { origin:"http://localhost:5173",credentials:true}
))
app.use(cookieParser())
app.use("/api/auth",authRoutes);
app.use("/api",messageRoute);
app.get('/', (req, res) => res.send('Hello World!'))
app.use(notFound);
app.use(errorHandler);
server.listen(port, () => console.log(`Example app listening on port ${port}!`))