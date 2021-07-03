import dotenv from "dotenv"

import App from "./App"

// Initialize server
dotenv.config()

let port = process.env.PORT!
let dev = process.env.NODE_ENV !== "production"

new App(port, dev)
