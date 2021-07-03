import Head from "next/head"
import { withRouter } from "next/router"
import { Component } from "react"
import { io } from "socket.io-client"

import type { NextRouter } from "next/router"
import type { ReactElement } from "react"
import type { Socket } from "socket.io-client"

import styles from "../styles/Main.module.css"

import Sidebar from "../components/main/Sidebar"
import Video from "../components/main/Video"

import type { JoinData } from "../server/App"

interface Props
{

    router: NextRouter

}

interface State
{

    socket: Socket | null

}

class Main extends Component<Props, State>
{

    public state: State =
    {
        socket: null
    }

    private code!: string


    public componentDidMount(): void
    {
        let code = this.props.router.query.id

        // Select first id
        if (code instanceof Array) code = code[0]
        if (code == null)
        {
            // Redirect to home if no id is provided
            this.props.router.push("/")
            return
        }
        
        // Connect to session
        let socket = io()
        
        // Join session
        this.code = code
        let join: JoinData = { code }

        socket.emit("join", join, this.error.bind(this))

        this.setState({ socket })
    }

    private error(): void
    {
        this.props.router.push("/")
    }

    
    public render(): ReactElement | null
    {
        let socket = this.state.socket
        if (socket === null) return null

        return (
            <div className={styles.main}>
                <Head>
                    <title>Video - Youtube Synchronized</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Sidebar socket={socket} code={this.code} />
                <div className={styles.content}>
                    <Video socket={socket} />
                </div>
            </div>
        )
    }

}

export default withRouter(Main)
