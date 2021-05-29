import React from "react"

import "./main.css"

import Sidebar from "./Sidebar"
import Video from "./Video"

class Main extends React.Component
{

    public render(): React.ReactElement
    {
        return (
            <div className="main">
                <Sidebar />
                <div className="content">
                    <Video id="2g811Eo7K8U" />
                </div>
            </div>
        )
    }

}

export default Main
