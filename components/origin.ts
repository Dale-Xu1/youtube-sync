import type { IncomingMessage } from "http"

export default function origin(req: IncomingMessage, path: string): string
{
    // Convert relative URL to absolute
    let host = req.headers.host!
    let protocol = /^localhost(:\d+)?$/.test(host) ? "http" : "https"

    return `${protocol}://${host}${path}`
}
