import express from "express"
import next from "next"
import { Server } from "socket.io"

import type { Request, Response } from "express"
import type { Socket } from "socket.io"

import SessionManager from "./session/SessionManager"
import Connection from "./Connection"

export interface JoinData
{

    code: string

}

export default class App
{

    private app = express()
    private io!: Server

    private sessions = new SessionManager()


    public constructor(port: string | number, dev: boolean)
    {
        this.initialize(port, dev)
    }

    private async initialize(port: string | number, dev: boolean): Promise<void>
    {
        // Initialize Next app
        let app = next({ dev })
        let handler = app.getRequestHandler()

        await app.prepare()

        // Initialize Express server
        this.app.use(express.json())

        this.app.get("/sessions", this.getSessions.bind(this))
        this.app.post("/session", this.createSession.bind(this))

        this.app.all("*", handleAll)
        function handleAll(req: Request, res: Response): void
        {
            handler(req, res)
        }

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
