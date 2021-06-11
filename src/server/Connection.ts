import { Socket } from "socket.io"

import Session from "./session/Session"

export interface InitialData
{

    users: number
    id: string

}

class Connection
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
            users: session.users
        }
        socket.emit("initialize", data)

        socket.on("disconnect", this.disconnect.bind(this))
    }


    private disconnect(): void
    {
        this.session.disconnect()
        this.socket.to(this.room).emit("users", this.session.users)
    }

}

export default Connection
