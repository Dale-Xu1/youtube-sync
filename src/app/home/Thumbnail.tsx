import React from "react"
import { Link } from "react-router-dom"

interface Props
{

    id: string

    title: string
    image: string

}

export default function Thumbnail(props: Props): React.ReactElement
{
    return (
        <div className="thumbnail">
            <Link to={`/video?id=${props.id}`}>
                <div className="thumbnail-content">
                    <img src={props.image} alt="" />
                    <span>{props.title}</span>
                </div>
            </Link>
        </div>
    )
}