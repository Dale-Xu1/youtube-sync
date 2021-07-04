import React from "react"

import type { Socket } from "socket.io-client"

export interface MainContextType
{

    socket: Socket | null

}

let MainContext = React.createContext({} as MainContextType)
export default MainContext
