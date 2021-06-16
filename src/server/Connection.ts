import { Socket } from "socket.io"

import Session from "./session/Session"

export interface InitialData
{

    users: number
    id: string

    paused: boolean
    time: number

}

export default class Connection
{
    
    private room: string


    public constructor(private socket: Socket, private session: Session)
    {
        session.connect()

        // Join room
        this.room = session.id
        socket.join(this.room)

        // Broadcast data
        socket.to(this.room).emit("users", session.users)

        // Send user information
        let data: InitialData =
        {
            id: session.video,
            users: session.users,
            paused: session.paused,
            time: session.time
        }
        socket.emit("initialize", data)

        socket.on("play", this.play.bind(this))
        socket.on("pause", this.pause.bind(this))

        socket.on("disconnect", this.disconnect.bind(this))
    }


    private play(time: number): void
    {
        this.session.play(time)
        this.socket.to(this.room).emit("play", time)
    }

    private pause(time: number): void
    {
        this.session.pause(time)
        this.socket.to(this.room).emit("pause", time)
    }

    
    private disconnect(): void
    {
        this.session.disconnect()
        this.socket.to(this.room).emit("users", this.session.users)
    }

}
