import { Component } from "react"

import type { ReactElement } from "react"
import type { Socket } from "socket.io-client"

import styles from "../../styles/Main.module.css"

import type { InitialData } from "../../server/Connection"

interface Props
{

    socket: Socket
    code: string

}

interface State
{

    users: number | null

}

export default class Sidebar extends Component<Props, State>
{

    public state: State =
    {
        users: null
    }


    public componentDidMount(): void
    {
        let socket = this.props.socket

        socket.on("initialize", this.initialize.bind(this))
        socket.on("users", this.updateUsers.bind(this))
    }

    private initialize(data: InitialData): void
    {
        this.updateUsers(data.users)
    }

    private updateUsers(users: number): void
    {
        this.setState({ users })
    }

    public render(): ReactElement
    {
        return (
            <div className={styles.sidebar}>
                <div className={styles["sidebar-container"]}>
                    <h2>CONNECTED USERS</h2>
                    <span>{this.state.users}</span>
                </div>
                <div className={`${styles.code} ${styles["sidebar-container"]}`}>
                    <h2 className={styles.inline}>CODE:</h2>
                    <h2 className={styles.newline}>CODE</h2>
                    <span>{this.props.code}</span>
                </div>
            </div>
        )
    }

}
