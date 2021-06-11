import React from "react"

import Connection from "./Connection"

interface Props
{

    connection: Connection
    code: string

}

interface State
{

    users: number | null

}

class Sidebar extends React.Component<Props, State>
{

    public state: State =
    {
        users: null
    }


    public componentDidMount(): void
    {
        let connection = this.props.connection
        connection.socket.on("users", this.updateUsers.bind(this))
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
                    <h3>CODE:</h3>
                    <span>{this.props.code}</span>
                </div>
            </div>
        )
    }

}

export default Sidebar
