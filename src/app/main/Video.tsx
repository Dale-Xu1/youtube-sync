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

export default class Video extends React.Component<Props, State>
{

    public state: State =
    {
        id: null
    }

    private connection: Connection | null = null

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
        let paused = this.data.paused

        // Initialize player
        if (paused)
        {
            player.setVolume(0)
            player.seekTo(this.data.time, true)
        }
        else
        {
            // Compensate for loading time
            let time = this.data.time + (Date.now() - this.start) / 1000
            player.seekTo(time, true)
        }

        this.connection = new Connection(this.props.socket, player, paused)
    }


    public componentWillUnmount(): void
    {
        if (this.connection === null) return
        this.connection.disconnect()
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
