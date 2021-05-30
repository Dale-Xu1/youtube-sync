import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { Server, Socket } from "socket.io"

import SessionManager from "./session/SessionManager"

class App
{

    private app = express()
    private io: Server

    private sessions = new SessionManager()


    public constructor(port: string | number)
    {
        this.app.use(express.static("build"))
        this.app.use(express.json())

        this.app.get("/list", this.getList.bind(this))

        this.app.get("/session", this.getSession.bind(this))
        this.app.post("/session", this.createSession.bind(this))

        // Start server
        let server = this.app.listen(port)
        this.io = new Server(server)

        this.io.on("connection", this.connection.bind(this))

        this.sessions.create("0gpFsnCz3HQ")
        this.sessions.create("2g811Eo7K8U")
        this.sessions.create("dQw4w9WgXcQ")
    }


    private getList(req: Request, res: Response): void
    {
        res.send(this.sessions.list())
    }

    private getSession(req: Request, res: Response): void
    {
        // Make sure id parameter is a string
        let id = req.query.id
        if (typeof id !== "string")
        {
            res.status(400).send({ error: "id parameter is required" })
            return
        }

        let session = this.sessions.get(id)
        if (session === null)
        {
            // Session doesn't exist
            res.status(404).send({ error: "Session not found" })
        }
        else res.send(session)
    }

    private createSession(req: Request, res: Response): void
    {
        let id = this.sessions.create(req.body.id)
        res.send({ id })
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
