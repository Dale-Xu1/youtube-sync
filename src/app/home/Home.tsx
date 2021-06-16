import axios from "axios"
import React from "react"

import "./home.css"

import { ThumbnailData } from "../../server/session/SessionManager"
import NewVideo from "./NewVideo"
import Thumbnail from "./Thumbnail"

interface State
{

    thumbnails: ThumbnailData[]

}

export default class Home extends React.Component<object, State>
{

    public state: State =
    {
        thumbnails: []
    }
    
    private mounted = false


    public constructor(props: object)
    {
        super(props)
        this.fetchData()
    }

    private async fetchData(): Promise<void>
    {
        let response = await axios.get("/sessions")

        if (this.mounted) this.setState({ thumbnails: response.data })
        else this.state.thumbnails = response.data
    }
    

    public componentDidMount(): void
    {
        this.mounted = true
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
