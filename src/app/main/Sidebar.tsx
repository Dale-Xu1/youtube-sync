import React from "react"

interface Props
{

    id: string

}

class Sidebar extends React.Component<Props>
{

    public render(): React.ReactElement
    {
        return (
            <div className="sidebar">
                <div className="sidebar-container">
                    <h2>CONNECTED USERS</h2>
                    <span>2</span>
                </div>
                <div className="code sidebar-container">
                    <h3>CODE:</h3>
                    <span>{this.props.id}</span>
                </div>
            </div>
        )
    }

}

export default Sidebar
