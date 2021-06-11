import query from "query-string"
import React from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"

import "./main.css"

import Sidebar from "./Sidebar"
import Video from "./Video"
import Connection from "./Connection"

interface State
{

    connection: Connection | null

}

export class Main extends React.Component<RouteComponentProps, State>
{

    public state: State =
    {
        connection: null
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
        let connection = new Connection(this, this.code)
        this.setState({ connection })
    }

    public componentWillUnmount(): void
    {
        let connection = this.state.connection
        if (connection === null) return

        // Disconnect from session
        connection.disconnect()
    }

    public render(): React.ReactElement | null
    {
        let connection = this.state.connection
        if (connection === null) return null

        return (
            <div className="main">
                <Sidebar connection={connection} code={this.code} />
                <div className="content">
                    <Video connection={connection} />
                </div>
            </div>
        )
    }

}

export default withRouter(Main)
