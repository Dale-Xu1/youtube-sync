import React from "react"
import { Link, Route, Switch } from "react-router-dom"

import "./index.css"

import Home from "./home/Home"
import Main from "./main/Main"
import NotFound from "./NotFound"

class App extends React.Component
{

    public render(): React.ReactElement
    {
        return (
            <div className="app">
                <div className="header">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </div>
                <Switch>
                    <Route path="/video" component={Main} />
                    <Route exact path="/" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }

}

export default App
