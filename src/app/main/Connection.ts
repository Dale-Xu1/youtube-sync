import { Socket } from "socket.io-client";

class Connection
{

    public constructor(socket: Socket, private player: YT.Player)
    {
        
    }

}

export default Connection
