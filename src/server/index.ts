import express from "express"
import dotenv from "dotenv"
import { Server, Socket } from "socket.io"

class App
{

    private app = express()
    private io: Server


    public constructor(port: string | number)
    {
        this.app.use(express.static("build"))

        // Start server
        let server = this.app.listen(port)
        this.io = new Server(server)

        this.io.on("connection", this.connection.bind(this))
    }


    private connection(socket: Socket): void
    {

    }

}

// Initialize server
dotenv.config()
let port = process.env.PORT!

new App(port)
console.log(`Server running on port ${port}`)
