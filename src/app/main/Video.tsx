import React from "react"
import YouTube from "react-youtube"

import Connection from "./Connection"

interface Props
{

    connection: Connection

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
        let connection = this.props.connection
        connection.socket.on("video", this.updateVideo.bind(this))
    }

    private updateVideo(id: string): void
    {
        this.setState({ id })
    }

    private onReady(event: YT.PlayerEvent): void
    {
        let player = event.target
        console.log(this.props.connection)
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
