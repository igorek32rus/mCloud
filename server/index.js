const express = require("express")
const mongoose = require("mongoose")
const config = require("config")

const cors = require("./middleware/cors.middleware")

const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")

const app = express()
const SERVER_PORT = config.get("SERVER_PORT")

app.use(cors)
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

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