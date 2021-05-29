import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import "./index.css"

import Home from "./Home"
import Main from "./main/Main"

class App extends React.Component
{

    public render(): React.ReactElement
    {
        return (
            <Router>
                <div className="app">
                    <div className="header"></div>
                    <Switch>
                        <Route path="/video" component={Main} />
                        <Route path="/" component={Home} />
                    </Switch>
                </div>
            </Router>
        )
    }

}

export default App
