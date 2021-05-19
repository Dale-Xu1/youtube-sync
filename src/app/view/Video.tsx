import React from "react"
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
