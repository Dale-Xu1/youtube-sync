import { Component } from "react"

import type { MouseEvent, ReactElement } from "react"

import styles from "../../styles/Home.module.css"

interface State
{
    
    show: boolean

}

export default class Popup extends Component<object, State>
{

    public state: State =
    {
        show: false
    }


    public show(): void
    {
        this.setState({ show: true })
    }

    private hide(): void
    {
        this.setState({ show: false })
    }

    private stopPropagation(e: MouseEvent): void
    {
        e.stopPropagation()
    }


    public render(): ReactElement
    {
        let show = this.state.show

        return (
            <div
                className={`${styles.background} ${show ? "" : styles.hidden}`}
                onMouseDown={this.hide.bind(this)}
            >
                <div
                    className={`${styles.popup} ${show ? "" : styles["popup-hidden"]}`}
                    onMouseDown={this.stopPropagation.bind(this)}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }

}
