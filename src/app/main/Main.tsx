import query from "query-string"
import React from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"

import "./main.css"

import Sidebar from "./Sidebar"
import Video from "./Video"

class Main extends React.Component<RouteComponentProps>
{

    private id: string | null = null


    public constructor(props: RouteComponentProps)
    {
        super(props)
        
        let id = query.parse(this.props.location.search).id

        // Select first id
        if (id instanceof Array) id = id[0]
        if (id == null)
        {
            // Redirect to home if no id is provided
            this.props.history.push("/")
            return
        }

        this.connect(id)
    }

    private async connect(id: string): Promise<void>
    {
        // TODO: Use id to connect to socket (and encapsulate in object) rather than sending id to components
        this.id = id
    }

    public componentWillUnmount(): void
    {

    }

    public render(): React.ReactElement | null
    {
        if (this.id === null) return null

        return (
            <div className="main">
                <Sidebar id={this.id} />
                <div className="content">
                    <Video id={this.id} />
                </div>
            </div>
        )
    }

}

export default withRouter(Main)
