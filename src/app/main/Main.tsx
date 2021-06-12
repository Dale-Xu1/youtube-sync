import query from "query-string"
import React from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { io, Socket } from "socket.io-client"

import "./main.css"

import Sidebar from "./Sidebar"
import Video from "./Video"
import { JoinData } from "../../server"

interface State
{

    socket: Socket | null

}

export class Main extends React.Component<RouteComponentProps, State>
{

    public state: State =
    {
        socket: null
    }

    private code!: string


    public constructor(props: RouteComponentProps)
    {
        super(props)
        
        let code = query.parse(this.props.location.search).id

        // Select first id
        if (code instanceof Array) code = code[0]
        if (code == null)
        {
            // Redirect to home if no id is provided
            this.props.history.push("/")
            return
        }
        
        this.code = code
    }

    public componentDidMount(): void
    {
        // Connect to session
        let socket = io()
        
        // Join session
        let join: JoinData = { code: this.code }
        socket.emit("join", join, this.error.bind(this))

        this.setState({ socket })
    }

    private error(): void
    {
        this.props.history.push("/")
    }

    public componentWillUnmount(): void
    {
        let socket = this.state.socket
        if (socket === null) return

        // Disconnect from session
        socket.disconnect()
    }

    public render(): React.ReactElement | null
    {
        let socket = this.state.socket
        if (socket === null) return null

        return (
            <div className="main">
                <Sidebar socket={socket} code={this.code} />
                <div className="content">
                    <Video socket={socket} />
                </div>
            </div>
        )
    }

}

export default withRouter(Main)
