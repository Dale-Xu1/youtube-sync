import React from "react"
import YouTube from "react-youtube"
import { Socket } from "socket.io-client"

import { InitialData } from "../../server/Connection"
import Connection from "./Connection"

interface Props
{

    socket: Socket

}

interface State
{

    id: string | null

}

class Video extends React.Component<Props, State>
{

    public state: State =
    {
        id: null
    }

    private start = Date.now()
    private data!: InitialData


    public componentDidMount(): void
    {
        let socket = this.props.socket
        socket.on("initialize", this.initialize.bind(this))
    }

    private initialize(data: InitialData): void
    {
        this.data = data
        this.setState({ id: data.id })
    }

    private onReady(event: YT.PlayerEvent): void
    {
        let player = event.target

        // Initialize player
        if (this.data.paused)
        {
            player.pauseVideo()
            player.seekTo(this.data.time, true)
        }
        else
        {
            // Compensate for loading time
            let time = this.data.time + (Date.now() - this.start) / 1000
            player.seekTo(time, true)
        }

        new Connection(this.props.socket, player)
    }

    public render(): React.ReactElement | null
    {
        let id = this.state.id
        if (id === null) return null

        return (
            <div className="video">
                <YouTube
                    videoId={id}
                    opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                            autoplay: 1,
                            modestbranding: 1,
                            rel: 0
                        }
                    }}
                    onReady={this.onReady.bind(this)}
                />
            </div>
        )
    }

}

export default Video
