import React from "react"
import { Socket } from "socket.io-client"

import { InitialData } from "../../server/Connection"

interface Props
{

    socket: Socket
    code: string

}

interface State
{

    users: number | null

}

export default class Sidebar extends React.Component<Props, State>
{

    public state: State =
    {
        users: null
    }


    public componentDidMount(): void
    {
        let socket = this.props.socket

        socket.on("initialize", this.initialize.bind(this))
        socket.on("users", this.updateUsers.bind(this))
    }

    private initialize(data: InitialData): void
    {
        this.updateUsers(data.users)
    }

    private updateUsers(users: number): void
    {
        this.setState({ users })
    }

    public render(): React.ReactElement
    {
        return (
            <div className="sidebar">
                <div className="sidebar-container">
                    <h2>CONNECTED USERS</h2>
                    <span>{this.state.users}</span>
                </div>
                <div className="code sidebar-container">
                    <h3 className="inline">CODE:</h3>
                    <h3 className="newline">CODE</h3>
                    <span>{this.props.code}</span>
                </div>
            </div>
        )
    }

}
