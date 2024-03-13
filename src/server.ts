import 'dotenv/config'
import express, { json } from "express"
import { routes } from "./routes"
import { setupMongo } from './database'
import { errorHandler } from './middlewares/error.handler.middleware'
import cors from "cors"

setupMongo().then(() => {

const app = express()

app.use(cors({
    origin: process.env.FRONT_URL
}))

app.use(json())

app.use(routes)

app.use(errorHandler)

app.listen(3333, () => console.log("🚀 App is running at port 3333!"))
})

