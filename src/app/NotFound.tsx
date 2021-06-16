import React from "react"

export default function NotFound(): React.ReactElement
{
    return (
        <div className="page">
            <div className="not-found">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <span>The URL you have tried to visit does not exit. Try going somewhere else.</span>
            </div>
        </div>
    )
}
