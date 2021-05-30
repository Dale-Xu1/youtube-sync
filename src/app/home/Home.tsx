import axios from "axios"
import React from "react"

import "./home.css"

import { ThumbnailData } from "../../server/session/SessionManager"
import NewVideo from "./NewVideo"
import Thumbnail from "./Thumbnail"

interface Props { }

interface State
{

    thumbnails: ThumbnailData[]

}

class Home extends React.Component<Props, State>
{

    public state: State =
    {
        thumbnails: []
    }


    public constructor()
    {
        super({})
        this.fetchData()
    }

    private async fetchData(): Promise<void>
    {
        let response = await axios.get("/list")
        this.setState({ thumbnails: response.data })
    }

    public render(): React.ReactElement
    {
        // Convert thumbnail data to elements
        let thumbnails: React.ReactElement[] = []
        for (let data of this.state.thumbnails)
        {
            thumbnails.push(<Thumbnail id={data.id} title={data.title} image={data.image} key={data.id}/>)
        }

        return (
            <div className="page">
                <div className="home container">
                    <NewVideo />
                    {thumbnails}
                </div>
            </div>
        )
    }

}

export default Home
