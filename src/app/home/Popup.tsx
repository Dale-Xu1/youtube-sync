import React, { MouseEvent } from "react"

interface State
{
    
    show: boolean

}

export default class Popup extends React.Component<{}, State>
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


    public render(): React.ReactElement
    {
        let show = this.state.show

        return (
            <div
                className={`background${show ? "" : " hidden"}`}
                onMouseDown={this.hide.bind(this)}
            >
                <div
                    className={`popup${show ? "" : " popup-hidden"}`}
                    onMouseDown={this.stopPropagation.bind(this)}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }

}
