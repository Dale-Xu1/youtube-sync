import React from "react"
import { Link } from "react-router-dom"

interface Props
{

    id: string

    title: string
    image: string

}

class Thumbnail extends React.Component<Props>
{

    public render(): React.ReactElement
    {
        return (
            <div className="thumbnail">
                <Link to={`/video?id=${this.props.id}`}>
                    <div className="thumbnail-content">
                        <img src={this.props.image} alt="" />
                        <span>{this.props.title}</span>
                    </div>
                </Link>
            </div>
        )
    }

}

export default Thumbnail
