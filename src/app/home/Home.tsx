import React from "react"

import "./home.css"

import NewVideo from "./NewVideo"
import Thumbnail from "./Thumbnail"

class Home extends React.Component
{

    public render(): React.ReactElement
    {
        return (
            <div className="page">
                <div className="home container">
                    <NewVideo />
                    <Thumbnail title="cat falling" image="https://i.ytimg.com/vi/2g811Eo7K8U/mqdefault.jpg" />
                    <Thumbnail title="Rick Astley - Never Gonna Give You Up (Video)" image="https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg" />
                </div>
            </div>
        )
    }

}

export default Home
