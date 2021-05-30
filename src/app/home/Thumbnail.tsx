import React from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"

interface Props extends RouteComponentProps
{

    id: string

    title: string
    image: string

}

class Thumbnail extends React.Component<Props>
{

    private onMouseDown(): void
    {
        this.props.history.push(`/video?id=${this.props.id}`)
    }

    public render(): React.ReactElement
    {
        return (
            <div className="thumbnail">
                <div className="thumbnail-content" onMouseDown={this.onMouseDown.bind(this)}>
                    <img src={this.props.image} alt="" />
                    <span>{this.props.title}</span>
                </div>
            </div>
        )
    }

}

export default withRouter(Thumbnail)
