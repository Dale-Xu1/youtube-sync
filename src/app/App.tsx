import React from "react"

import "./index.css"

import Sidebar from "./Sidebar"
import View from "./view/View"

class App extends React.Component
{

    public render(): React.ReactElement
    {
        return (
            <div className="app">
                <Sidebar />
                <View />
            </div>
        )
    }

}

export default App
