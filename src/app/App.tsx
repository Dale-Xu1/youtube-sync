import React from "react"
import YouTube from "react-youtube"

import "./index.css"

class App extends React.Component
{

    private player!: YT.Player


    public render(): React.ReactElement
    {
        return (
            <div>
                <YouTube videoId={"2g811Eo7K8U"} onReady={this.onReady.bind(this)} />
            </div>
        )
    }


    private onReady(event: YT.PlayerEvent): void
    {
        // Start video paused
        this.player = event.target
        this.player.pauseVideo()
    }

}

export default App
