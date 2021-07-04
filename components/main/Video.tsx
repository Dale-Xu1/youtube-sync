import { Component } from "react"
import YouTube from "react-youtube"

import type { ReactElement } from "react"

import styles from "../../styles/Main.module.css"

import Connection from "./Connection"
import MainContext, { MainContextType } from "./MainContext"

import type { InitialData } from "../../server/Connection"

interface State
{

    id: string | null

}

export default class Video extends Component<object, State>
{

    public static contextType = MainContext


    public state: State =
    {
        id: null
    }
    public context!: MainContextType

    private connection: Connection | null = null

    private start = Date.now()
    private data!: InitialData
    
    private initialized = false


    public componentWillUnmount(): void
    {
        if (this.connection === null) return
        this.connection.disconnect()
    }

    public render(): ReactElement
    {
        if (!this.initialized) this.initialize()

        let id = this.state.id
        if (id === null) return <div className={styles.video} />

        return (
            <div className={styles.video}>
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


    public initialize(): void
    {
        let socket = this.context.socket
        if (socket === null) return

        socket.on("initialize", this.initializeData.bind(this))
        this.initialized = true
    }

    private initializeData(data: InitialData): void
    {
        this.data = data
        this.setState({ id: data.id })
    }

    private onReady(event: YT.PlayerEvent): void
    {
        let player = event.target
        let paused = this.data.paused

        // Initialize player
        if (paused)
        {
            player.setVolume(0)
            player.seekTo(this.data.time, true)
        }
        else
        {
            // Compensate for loading time
            let time = this.data.time + (Date.now() - this.start) / 1000
            player.seekTo(time, true)
        }

        let socket = this.context.socket!
        this.connection = new Connection(socket, player, paused)
    }

}
