import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { Server, Socket } from "socket.io"

import SessionManager from "./session/SessionManager"
import Connection from "./Connection"

export interface JoinData
{

    code: string

}

class App
{

    private app = express()
    private io: Server

    private sessions = new SessionManager()


    public constructor(port: string | number)
    {
        this.app.use(express.static("build"))
        this.app.use(express.json())

        this.app.get("/sessions", this.getSessions.bind(this))
        this.app.post("/session", this.createSession.bind(this))

        // Start server
        let server = this.app.listen(port)
        this.io = new Server(server)

        this.io.on("connection", this.connection.bind(this))
    }


    private getSessions(req: Request, res: Response): void
    {
        res.send(this.sessions.thumbnails())
    }

    private createSession(req: Request, res: Response): void
    {
        let id = this.sessions.create(req.body.id)
        res.send({ id })
    }


    private connection(socket: Socket): void
    {
        socket.on("join", join)

        let sessions = this.sessions
        function join(data: JoinData, error: () => void)
        {
            // Initialize connection once user specifies code
            let session = sessions.get(data.code)
            if (session === null) return void error()

            new Connection(socket, session)
        }
    }

}

// Initialize server
dotenv.config()
let port = process.env.PORT!

new App(port)
console.log(`Server running on port ${port}`)
