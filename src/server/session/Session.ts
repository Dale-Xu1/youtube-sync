import axios from "axios"

import SessionManager from "./SessionManager"

class Session
{

    public pending = true

    public title!: string
    public image!: string

    public users = 0

    public paused = true
    public time = 0


    public constructor(private sessions: SessionManager, public id: string, public video: string)
    {
        this.startDelete() // Give user time to connect
        this.initialize()
    }

    public async initialize(): Promise<void>
    {
        // Get video data from YouTube API
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.video}&key=${process.env.YOUTUBE}`)
        let data = response.data.items[0].snippet

        this.title = data.title
        this.image = data.thumbnails.high.url

        // Data can now be freely accessed
        this.pending = false
    }


    public connect(): void
    {
        clearInterval(this.timer)
        this.users++
    }

    public disconnect(): void
    {
        this.users--
        if (this.users <= 0) this.startDelete() // Delete if no users are left
    }


    private timer!: NodeJS.Timeout

    private startDelete(): void
    {
        // Delete after 30 seconds
        this.timer = setInterval(this.delete.bind(this), 30000)
    }

    private delete(): void
    {
        this.sessions.delete(this.id)
    }

}

export default Session
