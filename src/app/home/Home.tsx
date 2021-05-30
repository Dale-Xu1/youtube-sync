import React from "react"

import "./home.css"

import NewVideo from "./NewVideo"
import Thumbnail from "./Thumbnail"

class Home extends React.Component
{

    public constructor()
    {
        super({})

        // TODO: Get all sessions
    }

    public render(): React.ReactElement
    {
        return (
            <div className="page">
                <div className="home container">
                    <NewVideo />
                    <Thumbnail
                        id="0gpFsnCz3HQ"
                        title={"\"Sunsprite's Eulogy\" | Passerine animatic"}
                        image="https://i.ytimg.com/vi/0gpFsnCz3HQ/hqdefault.jpg"
                    />
                    <Thumbnail
                        id="2g811Eo7K8U"
                        title="cat falling"
                        image="https://i.ytimg.com/vi/2g811Eo7K8U/hqdefault.jpg"
                    />
                    <Thumbnail
                        id="dQw4w9WgXcQ"
                        title="Rick Astley - Never Gonna Give You Up (Video)"
                        image="https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
                    />
                </div>
            </div>
        )
    }

}

export default Home
