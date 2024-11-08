import express from "express"
import mongoose from "mongoose";
import Post from "./Schemas/Post.js";
import postRouter from "./routers/Post.router.js";
import assembliesRouter from "./routers/assemblies.router.js"
import weaponModelsRouter from './routers/weaponModels.router.js'
import cors from "cors"

const PORT = 3000;
const DB_URL = 'mongodb+srv://csWorldDB:csWorldDB1244@cluster0.cra75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json())
app.use('/api', postRouter)
app.use('/api', assembliesRouter)
app.use('/api', weaponModelsRouter)


async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`Server started: localhost:${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

startApp()