import axios from "axios"
import React from "react"
import { RouteComponentProps, withRouter } from "react-router"

import Form from "./Form"
import Popup from "./Popup"

class NewVideo extends React.Component<RouteComponentProps>
{

    private popup = React.createRef<Popup>()
    private form = React.createRef<Form>()
    

    private show(): void
    {
        let popup = this.popup.current!
        let form = this.form.current!

        popup.show()
        form.focus()
    }

    private async createSession(id: string): Promise<void>
    {
        if (id.length === 0) return

        // Extract video ID if link was entered
        let start = id.indexOf("?v=")
        if (start !== -1)
        {
            let end = id.indexOf("&")
            if (end === -1) end = id.length

            id = id.slice(start + 3, end)
        }

        // Create session
        let response = await axios.post("/session", { id })
        let code: string = response.data.id

        this.joinSession(code)
    }

    private joinSession(code: string): void
    {
        if (code.length === 0) return
        this.props.history.push(`/video?id=${code}`)
    }


    public render(): React.ReactElement
    {
        return (
            <div className="thumbnail">
                <div className="new" onMouseDown={this.show.bind(this)}>
                    <div className="plus"></div>
                </div>
                <Popup ref={this.popup}>
                    <h2>WATCH A VIDEO</h2>
                    <Form
                        title="Create Session"
                        placeholder="Video URL"
                        onSubmit={this.createSession.bind(this)}
                        ref={this.form}
                    />
                    <Form
                        title="Join Session"
                        placeholder="Code"
                        onSubmit={this.joinSession.bind(this)}
                    />
                    <span className="info">Create a new video session by entering a YouTube video URL or ID, or join through the code displayed in the bottom-left corner of the client.</span>
                </Popup>
            </div>
        )
    }

}

export default withRouter(NewVideo)
