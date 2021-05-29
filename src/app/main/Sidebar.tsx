import React from "react"

class Sidebar extends React.Component
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
                    <h3>CODE: </h3>
                    <span>2g811Eo7K8U</span>
                </div>
            </div>
        )
    }

}

export default Sidebar
