import React from "react"
import { Redirect } from "react-router"
import YouTube from "react-youtube"

interface Props
{

    id: string

}

class Video extends React.Component<Props>
{

    private onReady(event: YT.PlayerEvent): void
    {
        let player = event.target
    }

    public render(): React.ReactElement
    {
        // Redirect if no video id is provided
        let id = this.props.id
        if (id.length === 0) return <Redirect to="/home" />

        return (
            <div className="video">
                <YouTube
                    videoId={this.props.id}
                    opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                            autoplay: 1,
                            modestbranding: 1
                        }
                    }}
                    onReady={this.onReady.bind(this)}
                />
            </div>
        )
    }

}

export default Video
