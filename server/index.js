const express = require("express")
const mongoose = require("mongoose")
const config = require("config")

const authRouter = require("./routes/auth.routes")

const app = express()
const SERVER_PORT = config.get("SERVER_PORT")

app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get("DB_URL"))

        app.listen(SERVER_PORT, () => {
            console.log("Server started. Port: ", SERVER_PORT);
        })
    } catch (error) {
        
    }
}

start()