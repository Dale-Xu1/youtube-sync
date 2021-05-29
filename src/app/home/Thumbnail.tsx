import React from "react"

interface Props
{

    title: string
    image: string

}

class Thumbnail extends React.Component<Props>
{

    public render(): React.ReactElement
    {
        return (
            <div className="thumbnail">
                <div className="thumbnail-content">
                    <img src={this.props.image} alt="" />
                    <span>{this.props.title}</span>
                </div>
            </div>
        )
    }

}

export default Thumbnail
