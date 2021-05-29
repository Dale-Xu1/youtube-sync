import React from "react"
import { Link, Route, Switch } from "react-router-dom"

import "./index.css"

import Home from "./Home"
import Main from "./main/Main"
import NotFound from "./NotFound"

class App extends React.Component
{

    public render(): React.ReactElement
    {
        return (
            <div className="app">
                <div className="header">
                    <Link to="/home">Home</Link>
                    <Link to="/about">About</Link>
                </div>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route exact path="/" component={Main} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }

}

export default App
