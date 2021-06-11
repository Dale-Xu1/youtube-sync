import { io } from "socket.io-client"

import { JoinData } from "../../server/index"
import { Main } from "./Main"

class Connection
{

    public socket = io()


    public constructor(private main: Main, code: string)
    {
        // Join session
        let join: JoinData = { code }
        this.socket.emit("join", join)
    }


    public disconnect(): void
    {
        this.socket.disconnect()
    }

}

export default Connection
