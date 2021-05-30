import query from "query-string"
import React from "react"
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom"

import "./main.css"

import Sidebar from "./Sidebar"
import Video from "./Video"

class Main extends React.Component<RouteComponentProps>
{

    public render(): React.ReactElement
    {
        let id = query.parse(this.props.location.search).id

        // Redirect if no id is provided
        if (id == null) return <Redirect to="/" />
        if (id instanceof Array) id = id[0] // Select first id

        // TODO: Use id to connect to socket (and encapsulate in object) rather than sending id to components

        return (
            <div className="main">
                <Sidebar id={id} />
                <div className="content">
                    <Video id={id} />
                </div>
            </div>
        )
    }

}

export default withRouter(Main)
