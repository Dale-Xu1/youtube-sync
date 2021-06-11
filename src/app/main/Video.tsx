import React from "react"
import YouTube from "react-youtube"
import { Socket } from "socket.io-client"

import { InitialData } from "../../server/Connection"

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


    public componentDidMount(): void
    {
        let socket = this.props.socket
        socket.on("initialize", this.initialize.bind(this))
    }

    private initialize(data: InitialData): void
    {
        this.setState({ id: data.id })
    }

    private onReady(event: YT.PlayerEvent): void
    {
        let player = event.target
        // TODO: Encapsulate player and socket stuff into object
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
