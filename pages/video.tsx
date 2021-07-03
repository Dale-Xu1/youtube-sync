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

class Main extends Component<Props>
{

    private socket: Socket | null = null
    private code!: string
    
    private initialized = false

    
    public render(): ReactElement | null
    {
        if (!this.initialized && this.props.router.isReady) this.initialize()

        if (this.socket === null) return null
        return (
            <div className={styles.main}>
                <Head>
                    <title>Video - Youtube Synchronized</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Sidebar socket={this.socket} code={this.code} />
                <div className={styles.content}>
                    <Video socket={this.socket} />
                </div>
            </div>
        )
    }


    private initialize(): void
    {
        this.initialized = true

        let router = this.props.router
        let code = router.query.id
        
        // Select first id
        if (code instanceof Array) code = code[0]
        if (code == null)
        {
            // Redirect to home if no id is provided
            this.props.router.push("/")
            return
        }
        
        // Connect to session
        this.socket = io()
        
        // Join session
        this.code = code
        let join: JoinData = { code }

        this.socket.emit("join", join, this.error.bind(this))
    }
    
    private error(): void
    {
        this.props.router.push("/")
    }

}

export default withRouter(Main)
